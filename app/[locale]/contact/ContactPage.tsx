"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { createContactRequest } from "@/actions/contact-request";

export default function ContactPage() {
    const t = useTranslations();
    const t_form = useTranslations("form");
    const t_privacy_tags = useTranslations("privacy_tags");
    const t_contact_page = useTranslations("contact_page");
    const { locale } = useParams() as { locale: string };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const email = formData.get("email")?.toString().trim();
        const subject = formData.get("subject")?.toString().trim();
        const reason = formData.get("reason")?.toString().trim();
        const accepted = formData.get("privacy");

        if (!email) {
            toast.error(t("form.errors.email_required"));
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            toast.error(t("form.errors.email_invalid"));
            return;
        }

        if (!subject) {
            toast.error(t("form.errors.subject_required"));
            return;
        }

        if (!reason) {
            toast.error(t("form.errors.reason_required"));
            return;
        }

        if (!accepted) {
            toast.error(t("form.errors.privacy_required"));
            return;
        }

        try {
            await createContactRequest(formData);

            // 2. Lanzar efecto Confetti en toda la pantalla
            confetti({
                particleCount: 120,
                spread: 80,
                origin: { y: 0.6 },
                colors: ["#10b981", "#06b6d4", "#3b82f6", "#a855f7"] // Tonalidades acordes al diseño neón
            });

            toast.success(t("form.success.submitted"));
            form.reset();
        } catch (err) {
            toast.error(
                err instanceof Error
                    ? err.message
                    : t("form.errors.submit_failed")
            );
        }
    };

    return (
        <div className="relative pt-20 pb-12 w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-white dark:bg-[#060608] selection:bg-emerald-500/30 selection:text-emerald-400">

            {/* 1. AMBIENTE FUTURISTA */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-linear-to-tr from-emerald-500/10 via-teal-500/10 to-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />

            {/* 2. HOLOGRAMA GIGANTE EN EL FONDO */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none -z-10 select-none overflow-hidden">
                <div className="absolute w-162.5 h-162.5 rounded-full border border-emerald-500/10 animate-[spin_60s_linear_infinite]" />
                <div className="absolute w-212.5 h-212.5 rounded-full border border-dashed border-cyan-500/10 animate-[spin_40s_linear_infinite_reverse]" />

                <i className="icon-[ph--paper-plane-tilt-duotone] text-[48rem] 
                    dark:text-emerald-400/10 text-emerald-600/10 
                    rotate-[-25deg] skew-x-6 scale-125 translate-x-12 translate-y-8 
                    blur-[1px] 
                    drop-shadow-[0_0_90px_rgba(16,185,129,0.3)] 
                    transition-all duration-700 animate-pulse"
                />
            </div>

            {/* 3. ENCABEZADO TERMINAL */}
            <div className="relative z-10 flex flex-col items-center mb-6 text-center px-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/30 dark:bg-emerald-950/30 bg-emerald-50/60 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="font-mono text-[11px] tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-bold">
                        SYSTEM // DIRECT_LINK_ACTIVE
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl dark:text-white text-black font-extrabold tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                    {t_contact_page("contact_with_us")}
                </h1>
            </div>

            {/* 4. CONTENEDOR DE FORMULARIO BENTO SCI-FI */}
            <div className="relative z-10 w-full md:max-w-2xl px-1 md:px-4">
                <div className="relative md:rounded-3xl rounded-xl border border-black/10 dark:border-white/10 dark:bg-[#0c0d12]/80 bg-white/80 backdrop-blur-2xl p-6 md:p-10 shadow-2xl dark:shadow-[0_0_60px_rgba(16,185,129,0.06)] transition-all">

                    <div className="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-linear-to-r from-transparent via-emerald-500/60 to-transparent" />
                    <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-linear-to-r from-transparent via-cyan-500/40 to-transparent" />

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                        {/* INPUT: EMAIL */}
                        <div className="w-full flex flex-col gap-1.5">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                                // 01. IDENTITY_PORTAL
                            </span>
                            <div className="relative group rounded-xl border border-black/10 dark:border-white/10 dark:bg-white/2 bg-black/2 focus-within:border-emerald-500 dark:focus-within:border-emerald-400 focus-within:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300">
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder=" "
                                    className="w-full peer border-none outline-none p-3.5 bg-transparent dark:text-white text-black input-normalized"
                                />
                                <label htmlFor="email" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm dark:text-white/50 text-black/50 transition-all duration-200 peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:text-emerald-500 dark:peer-focus:text-emerald-400 not-peer-placeholder-shown:-top-2.5 not-peer-placeholder-shown:translate-y-0 not-peer-placeholder-shown:text-[11px] dark:bg-[#0c0d12] bg-white px-1 rounded font-medium">
                                    {t_form("email")}
                                    <span className="text-red-500 ml-1 font-bold">*</span>
                                </label>
                            </div>
                        </div>

                        {/* INPUT: SUBJECT */}
                        <div className="w-full flex flex-col gap-1.5">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                                // 02. TRANSMISSION_HEADER
                            </span>
                            <div className="relative group rounded-xl border border-black/10 dark:border-white/10 dark:bg-white/2 bg-black/2 focus-within:border-emerald-500 dark:focus-within:border-emerald-400 focus-within:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300">
                                <input
                                    type="text"
                                    name="subject"
                                    id="subject"
                                    placeholder=" "
                                    className="w-full peer border-none outline-none p-3.5 bg-transparent dark:text-white text-black input-normalized"
                                />
                                <label htmlFor="subject" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm dark:text-white/50 text-black/50 transition-all duration-200 peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:text-emerald-500 dark:peer-focus:text-emerald-400 not-peer-placeholder-shown:-top-2.5 not-peer-placeholder-shown:translate-y-0 not-peer-placeholder-shown:text-[11px] dark:bg-[#0c0d12] bg-white px-1 rounded font-medium">
                                    {t_form("subject")}
                                    <span className="text-red-500 ml-1 font-bold">*</span>
                                </label>
                            </div>
                        </div>

                        {/* TEXTAREA: REASON */}
                        <div className="w-full flex flex-col gap-1.5">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                                // 03. ENCRYPTED_PAYLOAD
                            </span>
                            <div className="relative group rounded-xl border border-black/10 dark:border-white/10 dark:bg-white/2 bg-black/2 focus-within:border-emerald-500 dark:focus-within:border-emerald-400 focus-within:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300">
                                <textarea
                                    name="reason"
                                    id="motivo"
                                    rows={2}
                                    placeholder=" "
                                    className="w-full peer border-none outline-none p-3.5 resize-none overflow-x-hidden overflow-y-auto scrollbar-hidden max-h-44 dark:text-white text-black bg-transparent"
                                    onInput={(e) => {
                                        const el = e.currentTarget;
                                        el.style.height = "auto";
                                        el.style.height = `${el.scrollHeight}px`;
                                    }}
                                ></textarea>
                                <label htmlFor="motivo" className="pointer-events-none absolute left-3.5 top-4 text-sm dark:text-white/50 text-black/50 transition-all duration-200 peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:text-emerald-500 dark:peer-focus:text-emerald-400 not-peer-placeholder-shown:-top-2.5 not-peer-placeholder-shown:translate-y-0 not-peer-placeholder-shown:text-[11px] dark:bg-[#0c0d12] bg-white px-1 rounded font-medium">
                                    {t_form("reason_for_contact")}
                                    <span className="text-red-500 ml-1 font-bold">*</span>
                                </label>
                            </div>
                        </div>

                        {/* AVISO CAMPOS OBLIGATORIOS */}
                        <div className="w-full flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400/90 pt-1">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                            <p>
                                {t_form("fields_marked_with")} <span className="text-red-500 font-bold">*</span> {t_form("are_mandatory")}.
                            </p>
                        </div>

                        {/* CHECKBOX PRIVACIDAD */}
                        <div className="w-full pt-1">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="peer hidden"
                                    name="privacy"
                                />

                                <div className="
                                    mt-0.5 w-5 h-5 rounded-md
                                    border border-black/20 dark:border-white/20
                                    dark:bg-white/5 bg-black/5
                                    flex items-center justify-center
                                    transition-all duration-300
                                    peer-checked:bg-emerald-500
                                    peer-checked:border-emerald-500
                                    peer-checked:shadow-[0_0_12px_rgba(16,185,129,0.5)]
                                    group-hover:border-emerald-500/60
                                ">
                                    <i className="
                                        icon-[line-md--check]
                                        text-white
                                        text-sm
                                        opacity-0
                                        peer-checked:opacity-100
                                        transition-opacity duration-200
                                    " />
                                </div>

                                <div className="text-xs dark:text-white/60 text-black/60 leading-relaxed flex flex-wrap flex-row justify-start items-start">
                                    <span>
                                        {t_privacy_tags("accept_manage_my_data_v1")}
                                    </span>
                                    <br />
                                    <span className="mr-1">
                                        {t_privacy_tags("for_more_details_consult_v1")}
                                    </span>
                                    <Link href={`/${locale}/privacy`} className="dark:text-emerald-400 text-emerald-600 hover:underline font-medium inline-flex flex-row transition-colors justify-center items-center gap-1 group/link">
                                        {t_privacy_tags("privacy_policy")}
                                        <i className="icon-[mynaui--external-link-solid] group-hover/link:-translate-y-px group-hover/link:translate-x-px transition-transform text-xs" />
                                    </Link>.
                                </div>
                            </label>
                        </div>

                        {/* BOTÓN DE ENVO CYBERPUNK */}
                        <div className="w-full pt-4">
                            <button
                                type="submit"
                                className="relative group w-full overflow-hidden rounded-xl font-mono text-sm font-bold tracking-widest uppercase py-3.5 px-6 dark:bg-emerald-500 bg-emerald-600 dark:text-black text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {t_form("submit")}
                                    <i className="icon-[ph--paper-plane-right-bold] text-base group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                                </span>
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}