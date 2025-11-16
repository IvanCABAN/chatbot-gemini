import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { message } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
    apiKey;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: message }]
          }
        ]
      })
    });

    const result = await response.json();

    const reply =
      result.candidates?.[0]?.content?.parts?.[0]?.text ||
      "(No response from Gemini)";

    res.status(200).json({ reply });
  } catch (error) {
    console.error("API ERROR:", error);
    res.status(500).json({ error: "Gemini API error" });
  }
}
