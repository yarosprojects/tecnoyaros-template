"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { SPONSORS } from "../consts/sponsors";
import { SponsorsTemplate } from "../components/sponsors_template/SponsorsTemplate";

const normalizeName = (name: string) =>
    name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "");

export default function Sponsor() {
    const t = useTranslations("sponsors_page");
    const tGlobal = useTranslations(); // Instanciamos t sin namespace para usar rutas completas como 'sponsors_data.xxx'
    const { locale } = useParams() as { locale: string };

    return (
        <div className="relative w-full flex flex-col items-center px-4 md:pt-15 pt-25 pb-20 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[36px_36px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-87.5 bg-linear-to-tr from-cyan-500/20 via-indigo-500/15 to-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />

            <section aria-label="sponsors-hero" className="relative w-full max-w-4xl flex flex-col items-center text-center py-12 z-10">
                <span className="dark:text-cyan-400 text-cyan-600 text-xs tracking-widest uppercase font-mono px-4 py-1.5 border border-cyan-500/30 dark:bg-[#080809]/90 bg-white/90 backdrop-blur-xl rounded-full shadow-[0_0_15px_rgba(6,182,212,0.15)] mb-6">
                    {t("hero.tag")}
                </span>
                <h1 className="dark:text-white text-black text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                    {t("hero.title")}
                </h1>
                <p className="dark:text-white/60 text-black/60 max-w-2xl text-base md:text-lg leading-relaxed">
                    {t("hero.description")}
                </p>
            </section>

            <section aria-label="current-sponsors" className="w-full max-w-5xl py-10 z-10">
                <div className="flex flex-col items-center gap-3 text-center mb-12">
                    <h2 className="dark:text-white text-black text-2xl md:text-3xl font-bold tracking-tight">
                        {t("current.title")}
                    </h2>
                    <div className="w-12 h-1 bg-linear-to-r from-cyan-500 to-emerald-500 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    {SPONSORS.map((sponsor, index) => {
                        return (
                            <div
                                key={index}
                                className="relative group dark:bg-white/5 bg-black/5 backdrop-blur-2xl border dark:border-white/10 border-black/10 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]"
                            >
                                <div className="flex flex-col gap-5">
                                    <div className="flex flex-row justify-between items-center gap-4">
                                        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full dark:bg-emerald-500/10 bg-emerald-500/10 border border-emerald-500/30">
                                            <span className="relative flex h-2.5 w-2.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                                            </span>
                                            <span className="text-[11px] font-mono font-medium text-emerald-500 tracking-wide uppercase">
                                                {t("current.online")}
                                            </span>
                                        </div>

                                        <span className="text-xs font-mono px-3 py-1 rounded-full border border-green-500/30 text-green-500 bg-green-500/10">
                                            {tGlobal(sponsor.badgeKey)}
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="dark:text-white text-black text-2xl font-bold mb-1">
                                            {tGlobal(sponsor.nameKey)}
                                        </h3>
                                        <span className="text-xs font-mono dark:text-white/40 text-black/40 uppercase tracking-wider">
                                            {tGlobal(sponsor.categoryKey)}
                                        </span>
                                    </div>

                                    <p className="dark:text-white/70 text-black/70 text-sm leading-relaxed">
                                        {tGlobal(sponsor.descriptionKey)}
                                    </p>
                                </div>

                                <div className="pt-8 mt-6 border-t dark:border-white/5 border-black/5 flex flex-row justify-between items-center">
                                    {sponsor?.logo ? (
                                        <Image
                                            src={sponsor.logo}
                                            alt={tGlobal(sponsor.nameKey)}
                                            width={160}
                                            height={50}
                                            className="h-9 w-auto object-contain transition-all duration-300 opacity-90 group-hover:opacity-100 dark:brightness-0 dark:invert"
                                        />
                                    ) : (
                                        <span className="text-sm font-semibold dark:text-white/60 text-black/60">
                                            {tGlobal(sponsor.nameKey)}
                                        </span>
                                    )}

                                    <Link
                                        href={sponsor?.website || sponsor.website}
                                        target="_blank"
                                        className="inline-flex items-center gap-2 text-xs font-mono font-medium dark:text-cyan-400 text-cyan-600 hover:underline group/link"
                                    >
                                        <span>{t("current.visit_web")}</span>
                                        <i className="icon-[mynaui--external-link] text-sm group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section aria-label="sponsorship-plans" className="w-full max-w-6xl py-16 z-10">
                <SponsorsTemplate />
            </section>

            <section className="relative z-10 w-full max-w-5xl py-10 px-8 rounded-2xl dark:bg-white/5 bg-black/5 backdrop-blur-2xl border dark:border-white/10 border-black/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left transition-all duration-300 hover:border-white/20">
                <div className="flex flex-col gap-1.5">
                    <h3 className="dark:text-white text-black text-xl font-bold">
                        {t("custom.title")}
                    </h3>
                    <p className="dark:text-white/60 text-black/60 text-sm max-w-xl">
                        {t("custom.description")}
                    </p>
                </div>
                <Link
                    href={`/${locale}/contact`}
                    className="px-6 py-3 rounded-xl text-sm font-medium font-mono dark:text-white text-black border dark:border-white/20 border-black/20 dark:hover:bg-white/10 hover:bg-black/10 whitespace-nowrap transition-all duration-300 hover:shadow-lg active:scale-95"
                >
                    {t("custom.cta")}
                </Link>
            </section>
        </div>
    );
}