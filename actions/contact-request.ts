"use server";

import { supabaseAdmin } from "@/lib/supabase/server";

export async function createContactRequest(formData: FormData): Promise<void> {
    const email = formData.get("email")?.toString().trim();
    const subject = formData.get("subject")?.toString().trim();
    const reason = formData.get("reason")?.toString().trim();

    if (!email || !subject || !reason) {
        throw new Error("Todos los campos son obligatorios.");
    }

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        throw new Error("Correo electrónico no válido.");
    }

    const { error } = await supabaseAdmin
        .from("contact_requests")
        .insert({
            email,
            subject,
            reason,
        });

    if (error) {
        throw new Error(error.message);
    }
}