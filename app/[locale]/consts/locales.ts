export const localeConfig = {
    "es-ES": { label: "Español", icon: "icon-[circle-flags--es]" },
    "en-US": { label: "English", icon: "icon-[circle-flags--us]" },
    "ca-ES": { label: "Català", icon: "icon-[openmoji--catalonia-flag]" },
    "uk-UA": { label: "Українська", icon: "icon-[circle-flags--ua]" },
} as const;

export type Locale = keyof typeof localeConfig;

export const locales = Object.keys(localeConfig) as Locale[];

export const defaultLocale: Locale = "es-ES";