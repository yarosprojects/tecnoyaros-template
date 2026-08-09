export type SponsorTier = {
    id: string;
    code: string;
    link_code: string;
    name: string;
    price: string;
    period: string;
    popular?: boolean;
    description: string;
    badgeColor: string;
    buttonStyle: string;
    features: string[];
};

export const getSponsorTiers = (t: (key: string) => string): SponsorTier[] => [
    {
        id: "bronze",
        code: "01 // BRONZE",
        link_code: "bronze",
        name: t("tiers.bronze.name"),
        price: "150€",
        period: t("tiers.bronze.period"),
        description: t("tiers.bronze.description"),
        badgeColor: "border-amber-700/40 text-amber-500 bg-amber-500/10",
        buttonStyle: "bg-white/5 border border-black/10 dark:border-white/10 dark:hover:bg-white/10 hover:bg-black/10 text-black dark:text-white shadow-sm hover:border-black/20 dark:hover:border-white/20",
        features: [
            t("tiers.bronze.features.0"),
            t("tiers.bronze.features.1"),
            t("tiers.bronze.features.2"),
            t("tiers.bronze.features.3"),
        ],
    },
    {
        id: "silver",
        code: "02 // SILVER",
        link_code: "silver",
        name: t("tiers.silver.name"),
        price: "350€",
        period: t("tiers.silver.period"),
        popular: true,
        description: t("tiers.silver.description"),
        badgeColor: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10",
        buttonStyle: "bg-cyan-500 text-black font-semibold hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]",
        features: [
            t("tiers.silver.features.0"),
            t("tiers.silver.features.1"),
            t("tiers.silver.features.2"),
            t("tiers.silver.features.3"),
            t("tiers.silver.features.4"),
        ],
    },
    {
        id: "gold",
        code: "03 // GOLD",
        link_code: "gold",
        name: t("tiers.gold.name"),
        price: "700€",
        period: t("tiers.gold.period"),
        description: t("tiers.gold.description"),
        badgeColor: "border-amber-400/40 text-amber-300 bg-amber-400/10",
        buttonStyle: "bg-white/5 border border-black/10 dark:border-white/10 dark:hover:bg-white/10 hover:bg-black/10 text-black dark:text-white shadow-sm hover:border-black/20 dark:hover:border-white/20",
        features: [
            t("tiers.gold.features.0"),
            t("tiers.gold.features.1"),
            t("tiers.gold.features.2"),
            t("tiers.gold.features.3"),
            t("tiers.gold.features.4"),
        ],
    },
];