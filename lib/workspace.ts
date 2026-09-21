import { supabase } from "@/lib/supabaseClient";

export type Faq = { q: string; a: string };
export type ServiceItem = { name: string; detail: string; price: string };
export type Product = {
  id?: string;
  name: string;
  description: string;
  price: number;
};

export type KnowledgeAnswers = {
  businessName: string;
  bizType: string;
  brandVoice: string;
  hasLocation: string;
  locationName: string;
  address: string;
  mapsLink: string;
  description: string;
  greeting: string;
  hours: string;
  serviceAreas: string;
  languages: string;
  faqs: Faq[];
  services: ServiceItem[];
  pricingRules: string;
  refundPolicy: string;
  deliveryRules: string;
  appointmentRules: string;
  escalationContact: string;
  neverInvent: string;
};

export const emptyKnowledge: KnowledgeAnswers = {
  businessName: "",
  bizType: "",
  brandVoice: "",
  hasLocation: "",
  locationName: "",
  address: "",
  mapsLink: "",
  description: "",
  greeting: "",
  hours: "",
  serviceAreas: "",
  languages: "",
  faqs: [],
  services: [],
  pricingRules: "",
  refundPolicy: "",
  deliveryRules: "",
  appointmentRules: "",
  escalationContact: "",
  neverInvent: "",
};

export type Workspace = {
  id: string;
  owner_id: string;
  business_type: string | null;
  brand_voice: string | null;
  has_location: boolean | null;
  location_name: string | null;
  address: string | null;
  description: string | null;
  knowledge_answers: KnowledgeAnswers;
  onboarding_completed_at: string | null;
  ai_active: boolean;
};

export async function getOrCreateWorkspace(userId: string): Promise<Workspace> {
  const { data: existing, error: fetchErr } = await supabase
    .from("workspaces")
    .select("*")
    .eq("owner_id", userId)
    .maybeSingle();

  if (fetchErr) throw fetchErr;
  if (existing) return existing as Workspace;

  const { data: created, error: insertErr } = await supabase
    .from("workspaces")
    .insert({ owner_id: userId, knowledge_answers: emptyKnowledge })
    .select("*")
    .single();

  if (insertErr) throw insertErr;
  return created as Workspace;
}

export async function saveKnowledgeAnswers(
  workspaceId: string,
  answers: KnowledgeAnswers,
  markComplete = false
) {
  const { error } = await supabase
    .from("workspaces")
    .update({
      knowledge_answers: answers,
      business_type: answers.bizType,
      brand_voice: answers.brandVoice,
      has_location: answers.hasLocation === "yes",
      location_name: answers.locationName,
      address: answers.address,
      description: answers.description,
      ...(markComplete ? { onboarding_completed_at: new Date().toISOString() } : {}),
    })
    .eq("id", workspaceId);

  if (error) throw error;
}

export async function getProducts(workspaceId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data || []) as Product[];
}

export async function addProduct(workspaceId: string, product: Product) {
  const { error } = await supabase.from("products").insert({
    workspace_id: workspaceId,
    name: product.name,
    description: product.description,
    price: product.price,
  });
  if (error) throw error;
}

export function buildKnowledgeContext(answers: KnowledgeAnswers, products: Product[]) {
  const faqLines = answers.faqs
    .filter((f) => f.q.trim())
    .map((f) => `Q: ${f.q}\nA: ${f.a}`)
    .join("\n");

  const serviceLines = answers.services
    .filter((s) => s.name.trim())
    .map((s) => `- ${s.name} (${s.detail}) — ${s.price}`)
    .join("\n");

  const productLines = products
    .map((p) => `- ${p.name} — KES ${p.price} (${p.description})`)
    .join("\n");

  return `
Business name: ${answers.businessName || "Not provided"}
What they offer: ${answers.bizType || "Not specified"}
Brand voice: ${answers.brandVoice || "Friendly"}
Location: ${answers.hasLocation === "yes" ? `${answers.locationName}, ${answers.address}` : "No physical location"}
Description: ${answers.description || "Not provided"}
Preferred greeting: ${answers.greeting || "Hi there!"}
Working hours: ${answers.hours || "Not specified"}
Service areas: ${answers.serviceAreas || "Not specified"}
Languages: ${answers.languages || "English"}
Pricing rules: ${answers.pricingRules || "None specified"}
Refund/return policy: ${answers.refundPolicy || "None specified"}
Delivery rules: ${answers.deliveryRules || "None specified"}
Appointment rules: ${answers.appointmentRules || "None specified"}
Never claim or invent: ${answers.neverInvent || "Nothing specified — stick to known facts only"}

Services:
${serviceLines || "None listed"}

Products:
${productLines || "None listed"}

FAQs:
${faqLines || "None provided yet"}
`.trim();
}
