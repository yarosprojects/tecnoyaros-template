"use server";

import { supabaseAdmin } from "@/lib/supabase/server";

export async function createSponsorRequest(formData: FormData): Promise<void> {
    const companyName = formData.get("companyName")?.toString().trim();
    const contactName = formData.get("contactName")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const notes = formData.get("notes")?.toString().trim() || null;
    const plan = formData.get("plan")?.toString().trim();

    // Ahora phone también es obligatorio
    if (!companyName || !contactName || !email || !phone || !plan) {
        throw new Error("Todos los campos obligatorios deben estar completos.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error("Correo electrónico no válido.");
    }

    const { error } = await supabaseAdmin
        .from("sponsors")
        .insert({
            company_name: companyName,
            contact_name: contactName,
            email: email,
            phone: phone,
            notes: notes,
            plan: plan,
        });

    if (error) {
        throw new Error(error.message);
    }
}