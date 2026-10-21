// مسار الملف: api/chat.js

export default async function handler(req, res) {
  // التأكد من أن الطلب هو POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { input } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    // التوجيه المخفي وضعناه هنا في الخادم لحمايته
    const promptContext = `أنت خبير سينمائي ومساعد ذكي في تطبيق اسمه 'Movies Browser'. 
        أجب على رسالة المستخدم التالية باختصار، وبأسلوب ممتع وجذاب، ودائماً باللغة العربية، وتحدث عن الأفلام والسينما والمسلسلات فقط: ${input}`;

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptContext }] }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to fetch from Google");
    }

    const botReply = data.candidates[0].content.parts[0].text;

    // إرسال الرد النهائي إلى واجهة React
    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error("Vercel API Error:", error);
    res.status(500).json({ error: "Failed to connect to AI" });
  }
}
