const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent";

export async function generateReply(businessContext: string, customerMessage: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set");
    throw new Error("AI reply is temporarily unavailable");
  }

  const prompt = `You are Lewy, an AI customer response assistant for a business. Use ONLY the business information below to answer. If the answer isn't covered, say a human will follow up shortly. Keep the reply short, warm, and natural — like a real WhatsApp message, not a formal email.

BUSINESS INFORMATION:
${businessContext}

CUSTOMER MESSAGE:
${customerMessage}

Reply as Lewy:`;

  let res: Response;
  try {
    res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });
  } catch (networkErr) {
    console.error("Gemini network error:", networkErr);
    throw new Error("AI reply is temporarily unavailable");
  }

  if (!res.ok) {
    const errText = await res.text();
    console.error(`Gemini API error (${res.status}):`, errText);
    throw new Error("AI reply is temporarily unavailable");
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    console.error("Gemini returned no candidates:", JSON.stringify(data));
    throw new Error("AI reply is temporarily unavailable");
  }

  return text.trim();
}
