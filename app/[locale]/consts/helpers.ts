export const withLocale = (href: string, currentLocale: string) => {
    if (!href) return href;

    // evitar duplicar locale
    if (href.startsWith(`/${currentLocale}`)) return href;

    return `/${currentLocale}${href}`;
};