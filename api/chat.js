// مسار الملف: api/chat.js

export default async function handler(req, res) {
  // 1. إعداد ترويسات CORS للسماح بالاتصال (خطوة هامة جداً لمنع متصفحك من حظر الطلب)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 2. التعامل مع طلبات التأكد من المتصفح (Preflight)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // 3. التأكد من أن الطلب هو POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { input } = req.body;

    // 4. حماية السيرفر من الانهيار إذا كان المفتاح غير متوفر
    if (!process.env.GEMINI_API_KEY) {
      console.error(
        "CRITICAL ERROR: GEMINI_API_KEY is missing in Vercel Settings!",
      );
      return res.status(500).json({ error: "Server Configuration Error" });
    }

    const apiKey = process.env.GEMINI_API_KEY.trim();

    // 5. التوجيه المخفي (System Prompt)
    const promptContext = `أنت خبير سينمائي ومساعد ذكي في تطبيق اسمه 'Movies Browser'. 
        أجب على رسالة المستخدم التالية باختصار، وبأسلوب ممتع وجذاب، ودائماً باللغة العربية، وتحدث عن الأفلام والسينما والمسلسلات فقط: ${input}`;

    // 6. استخدام النموذج الأحدث والأكثر استقراراً
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptContext }] }],
      }),
    });

    const data = await response.json();

    // 7. التقاط أي خطأ من جوجل بدقة فائقة وطباعته في سجلات Vercel
    if (!response.ok) {
      console.error(
        "Google API Full Error Response:",
        JSON.stringify(data, null, 2),
      );
      throw new Error(data.error?.message || "Failed to fetch from Google API");
    }

    // 8. استخراج الرد بأمان (استخدام Optional Chaining لمنع الانهيار)
    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!botReply) {
      throw new Error("Invalid response structure from Gemini API");
    }

    // 9. إرسال الرد النهائي إلى واجهة React
    res.status(200).json({ reply: botReply });
  } catch (error) {
    // طباعة الخطأ في السجلات (Logs) للرجوع إليه عند الحاجة
    console.error("Vercel Serverless Function Error:", error.message);
    res
      .status(500)
      .json({ error: "فقدت الاتصال بالخادم. يرجى المحاولة مرة أخرى." });
  }
}
