// مسار الملف: api/chat.js

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const { input } = req.body;
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "API Key missing" });
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey.trim()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // استخدام النسخة المجانية تماماً من النموذج
          model: "google/gemini-1.5-flash:free",
          messages: [
            {
              role: "system",
              content:
                "أنت خبير سينمائي ومساعد ذكي في تطبيق اسمه Movies Browser. أجب باختصار وبأسلوب ممتع وجذاب باللغة العربية، وتحدث عن الأفلام والسينما والمسلسلات فقط.",
            },
            { role: "user", content: input },
          ],
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter Error:", data);
      throw new Error("Failed to fetch from OpenRouter");
    }

    const botReply = data.choices[0].message.content;
    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error("Server Error:", error.message);
    res
      .status(500)
      .json({ error: "فقدت الاتصال بالخادم. يرجى المحاولة مرة أخرى." });
  }
}
