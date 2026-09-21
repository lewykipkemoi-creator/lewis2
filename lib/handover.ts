import { supabase } from "@/lib/supabaseClient";

export type EscalationReason = "complaint" | "payment_discussion" | "price_negotiation";

const COMPLAINT_WORDS = ["complain", "complaint", "angry", "unacceptable", "disappointed", "refund me", "terrible", "worst"];
const PAYMENT_WORDS = ["mpesa number", "paybill", "till number", "bank account", "send money to", "account number", "card number"];
const NEGOTIATION_WORDS = ["lower price", "discount", "cheaper", "best price", "can you reduce", "negotiate", "too expensive"];

export function detectEscalation(text: string): EscalationReason | null {
  const t = text.toLowerCase();
  if (COMPLAINT_WORDS.some((w) => t.includes(w))) return "complaint";
  if (PAYMENT_WORDS.some((w) => t.includes(w))) return "payment_discussion";
  if (NEGOTIATION_WORDS.some((w) => t.includes(w))) return "price_negotiation";
  return null;
}

export const reasonLabels: Record<EscalationReason, string> = {
  complaint: "Customer complaint",
  payment_discussion: "Payment details discussion",
  price_negotiation: "Price negotiation",
};

async function ensureCustomer(workspaceId: string, name: string, channel: string) {
  const { data: existing } = await supabase
    .from("customers")
    .select("id")
    .eq("workspace_id", workspaceId)
    .eq("name", name)
    .maybeSingle();

  if (existing) return existing.id as string;

  const { data: created, error } = await supabase
    .from("customers")
    .insert({ workspace_id: workspaceId, name, channels: [channel] })
    .select("id")
    .single();

  if (error) throw error;
  return created.id as string;
}

export async function escalateConversation(
  workspaceId: string,
  customerName: string,
  channel: string,
  reason: EscalationReason,
  lastMessage: string,
  opportunityValue?: number
) {
  const customerId = await ensureCustomer(workspaceId, customerName, channel);

  const { data: conversation, error } = await supabase
    .from("conversations")
    .insert({
      workspace_id: workspaceId,
      customer_id: customerId,
      channel,
      status: "human_takeover_required",
      escalation_reason: reason,
      opportunity_value: opportunityValue ?? null,
      owner: "ai",
    })
    .select("id")
    .single();

  if (error) throw error;

  await supabase.from("messages").insert({
    conversation_id: conversation.id,
    sender: "customer",
    body: lastMessage,
  });

  return conversation.id as string;
}

export async function getPendingHandoverCount(workspaceId: string) {
  const { count, error } = await supabase
    .from("conversations")
    .select("id", { count: "exact", head: true })
    .eq("workspace_id", workspaceId)
    .eq("status", "human_takeover_required");

  if (error) throw error;
  return count ?? 0;
}

export async function getPendingHandovers(workspaceId: string) {
  const { data, error } = await supabase
    .from("conversations")
    .select("id, channel, escalation_reason, opportunity_value, created_at, customers(name)")
    .eq("workspace_id", workspaceId)
    .eq("status", "human_takeover_required")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function resolveHandover(conversationId: string) {
  const { error } = await supabase
    .from("conversations")
    .update({ status: "human_active", owner: "human" })
    .eq("id", conversationId);

  if (error) throw error;
}
