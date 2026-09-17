const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function generateReply(businessContext: string, customerMessage: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");

  const prompt = `You are Lewy, an AI customer response assistant for a business. Use ONLY the business information below to answer. If the answer isn't covered, say a human will follow up shortly. Keep the reply short, warm, and natural — like a real WhatsApp message, not a formal email.

BUSINESS INFORMATION:
${businessContext}

CUSTOMER MESSAGE:
${customerMessage}

Reply as Lewy:`;

  const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("No reply generated");
  return text.trim();
}
