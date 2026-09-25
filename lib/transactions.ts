import { supabase } from "@/lib/supabaseClient";

export type PendingTransaction = {
  id: string;
  customer_id: string;
  customer_name: string;
  lead_id: string | null;
  product_service: string | null;
};

async function ensureCustomer(workspaceId: string, name: string) {
  const { data: existing } = await supabase
    .from("customers")
    .select("id")
    .eq("workspace_id", workspaceId)
    .eq("name", name)
    .maybeSingle();

  if (existing) return existing.id as string;

  const { data: created, error } = await supabase
    .from("customers")
    .insert({ workspace_id: workspaceId, name })
    .select("id")
    .single();

  if (error) throw error;
  return created.id as string;
}

export async function createPendingTransaction(
  workspaceId: string,
  customerName: string,
  productService?: string,
  leadId?: string
) {
  const customerId = await ensureCustomer(workspaceId, customerName);

  const { error } = await supabase.from("transactions").insert({
    workspace_id: workspaceId,
    customer_id: customerId,
    lead_id: leadId ?? null,
    payment_status: null,
  });

  if (error) throw error;
}

export async function getPendingReconciliation(workspaceId: string): Promise<PendingTransaction | null> {
  const { data, error } = await supabase
    .from("transactions")
    .select("id, customer_id, lead_id, customers(name), leads(product_service)")
    .eq("workspace_id", workspaceId)
    .is("payment_status", null)
    .order("confirmed_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const customers = data.customers as unknown as { name: string } | { name: string }[] | null;
  const leads = data.leads as unknown as { product_service: string } | { product_service: string }[] | null;

  return {
    id: data.id,
    customer_id: data.customer_id,
    customer_name: Array.isArray(customers) ? customers[0]?.name : customers?.name || "Unknown customer",
    lead_id: data.lead_id,
    product_service: Array.isArray(leads) ? leads[0]?.product_service : leads?.product_service || null,
  };
}

export async function confirmTransaction(
  transactionId: string,
  invoiceAmount: number,
  paymentStatus: "paid" | "no_payment_made",
  confirmedBy: string
) {
  const { error } = await supabase
    .from("transactions")
    .update({
      invoice_amount: invoiceAmount,
      payment_status: paymentStatus,
      confirmed_by: confirmedBy,
      confirmed_at: new Date().toISOString(),
    })
    .eq("id", transactionId);

  if (error) throw error;
}
