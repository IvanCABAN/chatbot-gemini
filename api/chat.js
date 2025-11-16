import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { message } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=" + apiKey;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: { text: message }
    })
  });

  const result = await response.json();

  res.status(200).json({
    reply: result.candidates?.[0]?.outputText || "(No response)"
  });
}
