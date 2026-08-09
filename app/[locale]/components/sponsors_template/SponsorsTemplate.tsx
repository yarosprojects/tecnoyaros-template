"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { getSponsorTiers } from "../../consts/sponsors-data";

export const SponsorsTemplate = () => {
    const t = useTranslations("sponsors_page");
    const { locale } = useParams() as { locale: string };   
    const TIERS = getSponsorTiers(t);
    return (
        <>
            <div className="flex flex-col items-center gap-4 text-center mb-16">
                <h2 className="dark:text-white text-black text-3xl md:text-4xl font-bold tracking-tight">
                    {t("plans.title")}
                </h2>
                <p className="dark:text-white/60 text-black/60 max-w-xl text-sm md:text-base">
                    {t("plans.subtitle")}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full items-stretch">
                {TIERS.map((tier) => (
                    <div
                        style={{viewTransitionName: `plan-${tier.id}`}}
                        key={tier.id}
                        className={`relative flex flex-col justify-between p-8 rounded-2xl backdrop-blur-2xl transition-all duration-300 ${tier.popular
                            ? "dark:bg-white/8 bg-black/8 border-2 border-cyan-500/50 shadow-[0_0_35px_rgba(6,182,212,0.18)] lg:-translate-y-2"
                            : "dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/10 hover:border-cyan-500/30 hover:shadow-[0_0_25px_rgba(6,182,212,0.08)]"
                            }`}
                    >
                        {tier.popular && (
                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-500 text-black text-[10px] font-mono font-bold rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                                {t("plans.most_popular")}
                            </div>
                        )}

                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="dark:text-white text-black text-xl font-bold">
                                    {tier.name}
                                </h3>
                                <span className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border ${tier.badgeColor}`}>
                                    {tier.code}
                                </span>
                            </div>

                            <p className="dark:text-white/60 text-black/60 text-xs min-h-10 mb-6 leading-relaxed">
                                {tier.description}
                            </p>

                            <div className="flex items-baseline gap-1.5 mb-8">
                                <span className="dark:text-white text-black text-4xl font-extrabold tracking-tight">
                                    {tier.price}
                                </span>
                                <span className="dark:text-white/40 text-black/40 text-sm font-mono">
                                    {tier.period}
                                </span>
                            </div>

                            <div className="w-full h-px dark:bg-white/10 bg-black/10 mb-6" />

                            <ul className="flex flex-col gap-3.5 mb-8">
                                {tier.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-start gap-3 text-sm">
                                        <i className="icon-[ph--check-circle-fill] text-lg text-emerald-400 shrink-0 mt-0.5" />
                                        <span className="dark:text-white/80 text-black/80 text-xs md:text-sm">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link
                            href={`/${locale}/sponsors/become-a-sponsor/${tier.link_code}`}
                            className={`w-full py-3.5 px-6 rounded-xl text-center text-sm font-medium transition-all duration-300 active:scale-98 ${tier.buttonStyle}`}
                        >
                            {t("plans.cta")}
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}