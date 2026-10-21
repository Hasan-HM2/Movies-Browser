// مسار الملف: api/chat.js

export default async function handler(req, res) {
  // 1. إعداد ترويسات CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { input } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      console.error("CRITICAL ERROR: GEMINI_API_KEY is missing!");
      return res.status(500).json({ error: "Server Configuration Error" });
    }

    const apiKey = process.env.GEMINI_API_KEY.trim();

    const promptContext = `أنت خبير سينمائي ومساعد ذكي في تطبيق اسمه 'Movies Browser'. 
        أجب على رسالة المستخدم التالية باختصار، وبأسلوب ممتع وجذاب، ودائماً باللغة العربية، وتحدث عن الأفلام والسينما والمسلسلات فقط: ${input}`;

    // الحل الجذري: توجيه الطلب إلى gemini-pro المستقر
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptContext }] }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "Google API Full Error Response:",
        JSON.stringify(data, null, 2),
      );
      throw new Error(data.error?.message || "Failed to fetch from Google API");
    }

    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!botReply) {
      throw new Error("Invalid response structure from Gemini API");
    }

    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error("Vercel Serverless Function Error:", error.message);
    res
      .status(500)
      .json({ error: "فقدت الاتصال بالخادم. يرجى المحاولة مرة أخرى." });
  }
}
