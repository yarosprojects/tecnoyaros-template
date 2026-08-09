"use server";

import { supabaseAdmin } from "@/lib/supabase/server";

export async function createServiceRequest(formData: FormData): Promise<void> {
  console.log("------------------------ EXECUTED --------------------------");
  const email = formData.get("email")?.toString();
  const phone = formData.get("phone")?.toString();
  const subject = formData.get("subject")?.toString();
  const service = formData.get("service")?.toString();

  const { error } = await supabaseAdmin
    .from("service_requests")
    .insert({
      email,
      phone,
      subject,
      service,
    });

  if (error) {
    throw new Error(error.message);
  }
}