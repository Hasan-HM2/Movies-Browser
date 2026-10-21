// مسار الملف: api/chat.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // إعداد ترويسات CORS
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
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("Error: GEMINI_API_KEY is missing");
      return res.status(500).json({ error: "Server Configuration Error" });
    }

    // تهيئة مكتبة جوجل الرسمية
    const genAI = new GoogleGenerativeAI(apiKey.trim());

    // استدعاء النموذج
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `أنت خبير سينمائي ومساعد ذكي في تطبيق اسمه 'Movies Browser'. 
        أجب على رسالة المستخدم التالية باختصار، وبأسلوب ممتع وجذاب، ودائماً باللغة العربية، وتحدث عن الأفلام والسينما والمسلسلات فقط: ${input}`;

    // توليد الرد باستخدام المكتبة
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const botReply = response.text();

    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error("Google SDK Error:", error);
    res
      .status(500)
      .json({ error: "فقدت الاتصال بالخادم. يرجى المحاولة مرة أخرى." });
  }
}
