import { NextResponse } from "next/server";
import { generateReply } from "@/lib/gemini";

const DEMO_BUSINESS_CONTEXT = `
Business name: Amina's Salon
Industry: Salon, Spa & Beauty
Working hours: Monday–Saturday, 8:00 AM–6:00 PM. Closed Sundays.
Location: Nairobi, delivery/home visits available within the city.

Services:
- General Consultation — KES 1,500 (30 min, walk-in or booked)
- Follow-up Visit — KES 800 (15 min, booked only)
- Home Service Call-out — KES 3,000 (within Nairobi, same day)

Products:
- Premium Package — KES 24,000 (complete automation package)
- Growth Package — KES 7,500 (automated response and lead capture)

FAQs:
Q: What are your working hours?
A: Monday to Saturday, 8:00 AM to 6:00 PM. Closed Sundays and public holidays.
Q: Do you deliver / offer home visits?
A: Yes, within Nairobi and surrounding areas. Fees depend on location.
Q: What payment methods do you accept?
A: M-Pesa, bank transfer, and cash on delivery for orders under KES 20,000.
`.trim();

export async function POST(req: Request) {
  try {
    const { customerMessage, businessContext } = await req.json();

    if (!customerMessage || typeof customerMessage !== "string") {
      return NextResponse.json({ error: "customerMessage is required" }, { status: 400 });
    }

    const reply = await generateReply(businessContext || DEMO_BUSINESS_CONTEXT, customerMessage);
    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("generate-reply error:", err);
    return NextResponse.json({ error: err.message || "Failed to generate reply" }, { status: 500 });
  }
}
