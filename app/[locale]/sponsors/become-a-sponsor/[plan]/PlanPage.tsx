"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { getSponsorTiers } from "@/app/[locale]/consts/sponsors-data";
import SponsorPhoneField from "@/app/[locale]/components/sponsor-phone-field/SponsorPhoneField";
import { createSponsorRequest } from "@/actions/sponsor-request";

type Props = {
    plan: string;
};

export default function PlanPage({ plan }: Props) {
    const t = useTranslations("sponsors_page");
    const tPlan = useTranslations("planpage");
    const { locale } = useParams() as { locale: string };

    const tiers = getSponsorTiers(t);
    const selectedTier = tiers.find((t) => t.link_code === plan.toLowerCase());

    // Solo mantenemos el estado del teléfono por ser un componente custom
    const [phone, setPhone] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedTier) return;

        const form = e.currentTarget;
        const formData = new FormData(form);

        const companyName = formData.get("companyName")?.toString().trim();
        const contactName = formData.get("contactName")?.toString().trim();
        const email = formData.get("email")?.toString().trim();
        const phone = formData.get("phone")?.toString().trim() || null;

        // Validaciones del lado del cliente
        if (!companyName) {
            toast.error(tPlan("form.errors.company_required") || "El nombre de la empresa es obligatorio.");
            return;
        }

        if (!contactName) {
            toast.error(tPlan("form.errors.contact_required") || "El nombre de contacto es obligatorio.");
            return;
        }

        if (!email) {
            toast.error(tPlan("form.errors.email_required") || "El email es obligatorio.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error(tPlan("form.errors.email_invalid") || "Formato de correo inválido.");
            return;
        }
        if (!phone?.trim()) {
            toast.error(tPlan("form.errors.phone_required"));
            return;
        }

        setIsSubmitting(true);
        const loadingToast = toast.loading(tPlan("form.submitting") || "Enviando...");

        try {
            await createSponsorRequest(formData);

            // Efecto Confetti
            confetti({
                particleCount: 120,
                spread: 80,
                origin: { y: 0.6 },
                colors: ["#10b981", "#06b6d4", "#3b82f6", "#a855f7"]
            });

            toast.dismiss(loadingToast);
            toast.success(tPlan("form.success.submitted") || "¡Solicitud enviada con éxito!");

            form.reset();
            setPhone("");
        } catch (err) {
            toast.dismiss(loadingToast);
            toast.error(
                err instanceof Error
                    ? err.message
                    : tPlan("form.errors.submit_failed") || "Error al enviar la solicitud."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!selectedTier) {
        return (
            <section className="pt-40 pb-20 max-w-4xl mx-auto px-4 text-center">
                <h1 className="text-3xl font-bold dark:text-white text-black mb-4">
                    {tPlan("not_found.title")}
                </h1>
                <Link
                    href={`/${locale}/sponsors`}
                    className="text-cyan-400 hover:underline"
                >
                    {tPlan("not_found.back_link")}
                </Link>
            </section>
        );
    }

    return (
        <section className="pt-32 pb-20 max-w-7xl mx-auto px-4 md:px-8">
            <div className="mb-8">
                <Link
                    href={`/${locale}/sponsors`}
                    className="inline-flex items-center gap-2 text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
                >
                    <i className="icon-[ph--arrow-left] text-base" />
                    {tPlan("back_to_all")}
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                {/* TARJETA DE RESUMEN DEL PLAN */}
                <div
                    className={`lg:col-span-5 p-8 rounded-2xl dark:bg-white/5 bg-black/5 border ${selectedTier.popular
                        ? "border-cyan-500/50 shadow-lg shadow-cyan-500/10"
                        : "dark:border-white/10 border-black/10"
                        } backdrop-blur-2xl transition-all duration-300`}
                    style={{ viewTransitionName: `plan-${selectedTier.id}` }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <span
                            className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border ${selectedTier.badgeColor}`}
                        >
                            {selectedTier.code}
                        </span>
                        {selectedTier.popular && (
                            <span className="px-3 py-0.5 bg-cyan-500 text-black text-[10px] font-mono font-bold rounded-full uppercase tracking-wider">
                                {t("plans.most_popular")}
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold dark:text-white text-black mb-3">
                        {selectedTier.name}
                    </h1>

                    <p className="dark:text-white/70 text-black/70 text-sm leading-relaxed mb-6">
                        {selectedTier.description}
                    </p>

                    <div className="flex items-baseline gap-2 mb-8 pb-6 border-b dark:border-white/10 border-black/10">
                        <span className="dark:text-white text-black text-4xl md:text-5xl font-black tracking-tight">
                            {selectedTier.price}
                        </span>
                        <span className="dark:text-white/40 text-black/40 text-sm font-mono">
                            {selectedTier.period}
                        </span>
                    </div>

                    <h4 className="dark:text-white text-black text-xs font-bold uppercase tracking-wider mb-4">
                        {tPlan("benefits_included")}
                    </h4>
                    <ul className="space-y-3">
                        {selectedTier.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <i className="icon-[ph--check-circle-fill] text-lg text-emerald-400 shrink-0 mt-0.5" />
                                <span className="dark:text-white/80 text-black/80 text-sm">
                                    {feature}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* FORMULARIO */}
                <div className="lg:col-span-7 p-8 rounded-2xl dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/10 backdrop-blur-2xl">
                    <h2 className="text-2xl font-bold dark:text-white text-black mb-2">
                        {tPlan("form.title", { name: selectedTier.name })}
                    </h2>
                    <p className="dark:text-white/60 text-black/60 text-sm mb-8">
                        {tPlan("form.subtitle")}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Campos ocultos para enviar info extra al Server Action */}
                        <input type="hidden" name="plan" value={selectedTier.id} />
                        <input type="hidden" name="phone" value={phone} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-semibold dark:text-white/80 text-black/80 mb-2 uppercase tracking-wider">
                                    {tPlan("form.company_name")} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="companyName"
                                    placeholder={tPlan("form.company_name_placeholder")}
                                    className="w-full px-4 py-3 rounded-xl dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/10 dark:text-white text-black focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold dark:text-white/80 text-black/80 mb-2 uppercase tracking-wider">
                                    {tPlan("form.contact_name")} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="contactName"
                                    placeholder={tPlan("form.contact_name_placeholder")}
                                    className="w-full px-4 py-3 rounded-xl dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/10 dark:text-white text-black focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-semibold dark:text-white/80 text-black/80 mb-2 uppercase tracking-wider">
                                    {tPlan("form.email")} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder={tPlan("form.email_placeholder")}
                                    className="w-full px-4 py-3 rounded-xl dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/10 dark:text-white text-black focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold dark:text-white/80 text-black/80 mb-2 uppercase tracking-wider">
                                    {tPlan("form.phone")} <span className="text-red-500">*</span>
                                </label>
                                <SponsorPhoneField
                                    value={phone}
                                    onChange={(newPhone) => setPhone(newPhone)}
                                    placeholder={tPlan("form.phone_placeholder")}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold dark:text-white/80 text-black/80 mb-2 uppercase tracking-wider">
                                {tPlan("form.notes")}
                            </label>
                            <textarea
                                name="notes"
                                rows={4}
                                placeholder={tPlan("form.notes_placeholder")}
                                className="w-full px-4 py-3 rounded-xl dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/10 dark:text-white text-black focus:outline-none focus:border-cyan-500 transition-colors text-sm resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 px-6 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${selectedTier.buttonStyle
                                } ${isSubmitting
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:shadow-lg hover:shadow-cyan-500/10 active:scale-[0.99]"
                                }`}
                        >
                            {isSubmitting ? (
                                <i className="icon-[ph--spinner-gap-bold] animate-spin text-lg" />
                            ) : null}
                            {tPlan("form.submit_button", { name: selectedTier.name })}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}