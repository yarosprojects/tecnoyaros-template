"use client";
import { useTranslations } from "next-intl";
import { LINKS } from "../../consts/links";
import { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams, useParams } from "next/navigation";
import './header.css';
import Link from "next/link";
import { locales, localeConfig } from "../../consts/locales";
import { withLocale } from "../../consts/helpers";
import { services } from "../../consts/services";
import Clock from "../clock/Clock";
import { THEMES } from "../../consts/themes";

type StackItem = {
    label: string | null;
    code?: string;
    items: any[];
};
type Theme = keyof typeof THEMES

export const Header = () => {
    const t = useTranslations("header");
    const t_aside = useTranslations("aside");
    const t_themes = useTranslations("themes");
    const t_serviceConst = useTranslations("const_services");
    const searchParams = useSearchParams();
    const search = searchParams.toString();
    const activeService = searchParams.get("service");
    const langsRef = useRef<HTMLButtonElement | null>(null);
    const langsMobileRef = useRef<HTMLButtonElement | null>(null);
    const themeRef = useRef<HTMLButtonElement | null>(null);
    const [navigationOpen, setNavigationOpen] = useState(false);
    const [langsButtonOpen, setLangsButtonOpen] = useState(false);
    const [themeButtonOpen, setThemeButtonOpen] = useState(false);
    const [theme, setThemeState] = useState<Theme>('light')
    const pathname = usePathname();
    const normalize = (path: string) => {
        if (!path || path === "") return "/";
        return path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
    };
    const activeServiceItem = Object.values(services).find(
        service => service.slug === activeService
    );
    const activeServiceName = activeServiceItem?.label;
    const [stack, setStack] = useState<StackItem[]>([
        { label: null, items: LINKS }
    ]);
    const current = stack[stack.length - 1];
    const openChildren = (label: string, code: string, children: any[]) => {
        setStack(prev => [...prev, { label, code, items: children }]);
    };
    const goBack = () => {
        setStack(prev => prev.slice(0, -1));
    };
    const langsDropdownRef = useRef<HTMLDivElement | null>(null);

    const localeRegex = new RegExp(`^/(${locales.join("|")})`);
    const pathWithoutLocale = pathname.replace(localeRegex, "");
    const { locale } = useParams() as { locale: string };
    const applyTheme = (selectedTheme: Theme) => {
        const root = document.documentElement;
        if (selectedTheme === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.classList.toggle('dark', prefersDark);
        } else {
            root.classList.toggle('dark', selectedTheme === 'dark');
        }
    };

    const setTheme = (newTheme: Theme) => {
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        setThemeState(newTheme);
        setThemeButtonOpen(false);
    };

    useEffect(() => {
        const saved = (localStorage.getItem('theme') as Theme) || 'system';
        setThemeState(saved);

        // Escuchar cambios de preferencia del sistema si está en modo 'system'
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemChange = () => {
            if ((localStorage.getItem('theme') || 'system') === 'system') {
                applyTheme('system');
            }
        };

        mediaQuery.addEventListener('change', handleSystemChange);
        return () => mediaQuery.removeEventListener('change', handleSystemChange);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (
                langsButtonOpen &&
                langsRef.current &&
                langsMobileRef.current &&
                langsDropdownRef.current &&
                !langsRef.current.contains(target) &&
                !langsMobileRef.current.contains(target) &&
                !langsDropdownRef.current.contains(target)
            ) {
                setLangsButtonOpen(false);
            }

            if (
                themeButtonOpen &&
                themeRef.current &&
                !themeRef.current.contains(target)
            ) {
                setThemeButtonOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [langsButtonOpen, themeButtonOpen]);

    useEffect(() => {
        setNavigationOpen(false);
        setLangsButtonOpen(false);
    }, [pathname, searchParams]);

    const currentLocale = pathname.split("/")[1];
    const activeLocaleName = locales.find(locale => locale === currentLocale) ? localeConfig[currentLocale as keyof typeof localeConfig].label : 'español';
    const activeLocaleIcon = locales.find(locale => locale === currentLocale) ? localeConfig[currentLocale as keyof typeof localeConfig].icon : "circle-flags--es";

    useEffect(() => {
        if (navigationOpen) {
            document.body.classList.add('overflow-hidden!');
        } else {
            document.body.classList.remove('overflow-hidden!');
        }
    }, [navigationOpen]);



    return (
        <>
            <header id="header" className={`z-9999 w-full fixed top-0 left-0 ${navigationOpen ? 'dark:bg-black bg-white' : 'dark:bg-black/30 bg-white/30 backdrop-blur-2xl'} p-3 flex flex-col-reverse md:flex-col justify-center items-center transition-all duration-150`} aria-label="Header">
                <div className="absolute top-0 left-0 w-full h-full header-mask p-3 flex flex-col-reverse md:flex-col"></div>
                {/* <div className="w-full py-1 text-sm flex md:hidden justify-center items-center flex-row gap-1 text-green-800 selection:bg-white selection:text-black">
                    <span>{formatDate(now)}</span>
                    <span>{formatTime(now)}</span>
                </div> */}
                <div className="flex flex-row w-full justify-between items-center">
                    <div className="mx-0 md:mx-2 flex flex-row justify-start items-center gap-1">
                        <button
                            onClick={() => {
                                setNavigationOpen(!navigationOpen)
                                if (navigationOpen) setLangsButtonOpen(false)
                            }}
                            className="animate-zoom-in animate-duration-100 cursor-pointer flex md:hidden h-10 w-10 items-center justify-center rounded-md hover:bg-[rgb(var(--bg-variant-1f)/15)] transition"
                        >
                            <div className="relative flex flex-col gap-1.5">
                                {/* TOP */}
                                <span
                                    className={`
                                        block w-5 h-px dark:bg-white bg-black rounded-full
                                        transition-all duration-200 ease-in-out
                                        ${navigationOpen ? 'translate-y-1.5 rotate-45' : 'translate-y-0 rotate-0'}
                                    `}
                                />

                                {/* MIDDLE */}
                                <span
                                    className={`
                                        block w-5 h-px dark:bg-white bg-black rounded-full
                                        transition-all duration-200 ease-in-out
                                        ${navigationOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
                                    `}
                                />

                                {/* BOTTOM */}
                                <span
                                    className={`
                                        block w-5 h-px dark:bg-white bg-black rounded-full
                                        transition-all duration-200 ease-in-out
                                        ${navigationOpen ? '-translate-y-2 -rotate-45' : 'translate-y-0 rotate-0'}
                                    `}
                                />
                            </div>
                        </button>


                        <Link href={`/${locale}/`} className="cursor-pointer text-sm dark:text-white text-black mx-2 z-10 hover:scale-103 transition-transform active:scale-96">TY</Link>
                    </div>

                    <div className="hidden md:flex flex-row justify-center items-center gap-1 text-center text-sm text-green-800 flex-1 w-full selection:bg-white selection:text-black hover:animate-pulse">
                        <Clock />
                    </div>

                    <div className="flex flex-row justify-center items-center gap-2">
                        {/* THEME TOGGLE */}
                        <div className="relative w-auto">
                            <button type="button" ref={themeRef} onClick={() => {
                                if (langsButtonOpen) setLangsButtonOpen(false)
                                setThemeButtonOpen(!themeButtonOpen)
                            }} className={`mx-1 md:mx-0 flex justify-center items-center size-8 p-2 rounded-lg dark:hover:bg-[#1f1f1f] hover:bg-[#f1f1f1] transition cursor-pointer outline-none dark:text-white text-black border-none hover:scale-125 active:scale-90 ${themeButtonOpen ? 'dark:bg-[#1f1f1f] bg-[#f1f1f1]' : ''}`}>
                                <i
                                    className={`
                                        ${theme === 'dark' ? 'icon-[line-md--moon]'
                                            : theme === 'system' ? 'icon-[f7--desktopcomputer]'
                                                : 'icon-[tabler--sun]'
                                        }
                                        text-center
                                    `}
                                />
                            </button>

                            <div className={`${locale === "uk-UA" ? 'min-w-59' : ''} p-2 absolute top-full right-0 md:right-1/2 gap-px md:translate-x-1/2 rounded-lg mt-1 border dark:border-white/5 border-black/5 dark:bg-[#1f1f1f] bg-[#f1f1f1] backdrop-blur-2xl ${themeButtonOpen ? 'flex animate-fade-in-down animate-duration-250' : 'hidden'} flex-col`}>
                                {Object.values(THEMES).map((themeItem) => {
                                    const { id, label, icon } = themeItem;
                                    return (
                                        <button
                                            key={id}
                                            type="button"
                                            onClick={() => setTheme(id as Theme)} // Permite 'light', 'dark' o 'system'
                                            className="text-left cursor-pointer w-full px-3 py-1.5 text-sm dark:text-white/70 text-black/70 flex justify-left gap-2 items-center dark:hover:bg-white/5 hover:bg-black/5 rounded-lg transition"
                                        >
                                            <i className={`${icon} text-center pointer-events-none`} />
                                            <span className="pointer-events-none mr-4">
                                                {t_themes(label)}
                                            </span>
                                            {theme === id && (
                                                <i className="icon-[weui--done-outlined] ml-auto dark:text-white text-black" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>


                        {/* HEADER LANGS BUTTON */}
                        <div className={`relative hidden md:flex flex-row justify-start items-center gap-2 rounded-lg transition-all cursor-pointer ${langsButtonOpen ? 'dark:bg-black/80 bg-white/80 backdrop-blur-2xl' : 'bg-transparent'}`}>
                            <button type="button" ref={langsRef} onClick={() => {
                                if (themeButtonOpen) setThemeButtonOpen(false)
                                setLangsButtonOpen(!langsButtonOpen)
                            }} className={`${langsButtonOpen ? 'dark:bg-[#1f1f1f] bg-[#f1f1f1] dark:text-white text-black dark:brightness-120 brightness-90 rounded-tl-lg rounded-tr-lg' : 'bg-transparent rounded-lg'} dark:hover:bg-[#1f1f1f] hover:bg-[#f1f1f1] px-4 py-2  border-none outline-none dark:text-white/80 text-black/80 dark:hover:text-white hover:text-black text-sm flex flex-row justify-center items-center gap-1 cursor-pointer z-20`}>
                                <div className="flex flex-row justify-center items-center gap-2 pointer-events-none">
                                    <span className="pointer-events-none">
                                        {activeLocaleName}
                                    </span>
                                    <i className={`${activeLocaleIcon} ${activeLocaleIcon === "icon-[openmoji--catalonia-flag]" ? 'text-[22px]' : 'text-base'}`} />
                                </div>
                                <i className={`transition-transform pointer-events-none icon-[line-md--chevron-small-down] text-base ${langsButtonOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <div className={`absolute top-full left-0 rounded-bl-lg rounded-br-lg ${langsButtonOpen ? 'flex animate-fade-in-down animate-duration-300 dark:bg-[#1f1f1f] bg-[#f1f1f1]' : 'hidden bg-transparent'} flex-col justify-start items-start w-full p-2 gap-1 z-10`}>
                                {locales.map((locale) => (
                                    <Link
                                        key={locale}
                                        href={`/${locale}${pathWithoutLocale}${search ? `?${search}` : ""}`}
                                        className={`text-sm ${currentLocale === locale ? 'dark:text-white text-black' : 'dark:text-white/70 text-black/70'} dark:hover:text-white hover:text-black transition-colors flex justify-between w-full items-center flex-row gap-1`}
                                    >
                                        {localeConfig[locale].label}
                                        {currentLocale === locale && (
                                            <i className="icon-[weui--done-outlined] dark:text-white text-black" />
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className={`fixed w-full h-screen dark:bg-black/70 bg-white/70 backdrop-blur-2xl z-9998  flex flex-col md:p-0 pt-40 pb-10 md:hidden justify-center items-center ${navigationOpen ? 'left-0 opacity-100 pointer-events-auto' : '-left-full opacity-0 pointer-events-none'} transition-all duration-300`}>
                <nav className={`flex flex-col justify-center items-start gap-1 w-full px-2 md:px-6 ${stack.length > 1 ? 'animate-fade-in-left' : 'animate-fade-in-right'} animate-duration-200`}>

                    {/* BACK */}
                    {stack.length > 1 && (
                        <button
                            onClick={goBack}
                            className="dark:text-green-500 text-green-700 px-6 py-3 flex items-center gap-2"
                        >
                            <i className="icon-[material-symbols--arrow-back]" />
                            {t_aside(`links.${current.code}`)}
                        </button>
                    )}

                    {/* ITEMS */}
                    {current.items.map((item: any) => {
                        const { href, code, label, children } = item;
                        const localeRegex = new RegExp(`^/(${locales.join("|")})`);

                        let currentPath = pathname.replace(localeRegex, "");
                        currentPath = normalize(currentPath);

                        const cleanHref = href ? href.replace(localeRegex, "") : "";
                        const hrefPath = normalize(cleanHref.split("?")[0] || "/");

                        const params = new URLSearchParams(cleanHref.split("?")[1] || "");
                        const itemService = params.get("service");

                        const hasChildren = Array.isArray(children) && children.length > 0;

                        const isExact = currentPath === hrefPath;

                        const isChildRoute =
                            hrefPath !== "/" &&
                            currentPath.startsWith(hrefPath + "/");

                        const isActive = isExact;
                        const isSubActive = isChildRoute || (itemService && itemService === activeService);
                        const isChild =
                            hrefPath !== "/" &&
                            currentPath.startsWith(hrefPath + "/");
                        const isServiceSubRoute = !!activeService;


                        let color = "text-white";

                        const isInSubmenu = stack.length > 1;

                        if (isInSubmenu) {
                            if (isSubActive) {
                                color = "text-white";
                            } else {
                                color = "text-white/50";
                            }
                        } else {
                            if (hasChildren) {
                                if (isSubActive || isActive) {
                                    color = "text-green-500";
                                } else {
                                    color = "text-white";
                                }
                            } else {
                                if (isActive) {
                                    color = "text-green-500";
                                } else {
                                    color = "text-white";
                                }
                            }
                        }

                        // SI TIENE HIJOS → SE PONE BOTON
                        if (children) {
                            return (
                                <button
                                    key={label}
                                    onClick={() => openChildren(label, code, children)}
                                    className={`${color} text-lg px-6 py-3 dark:hover:bg-white/5 hover:bg-black/5 w-full rounded-lg flex justify-between items-center group`}
                                >
                                    <div className="flex flex-col justify-center items-start min-w-0 flex-1">
                                        <span className="dark:text-green-500 text-green-700">
                                            {t_aside(`links.${code}`)}
                                        </span>
                                        {isServiceSubRoute && (
                                            <div className="flex w-full justify-start items-center max-w-70">
                                                <span className="animate-fade-in animate-duration-500 truncate text-[13px] text-left dark:text-white/50 text-black/50">
                                                    {activeServiceName && t_serviceConst(activeServiceName)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <i className="icon-[line-md--chevron-right] group-hover:translate-x-1 transition-transform" />
                                </button>
                            );
                        }

                        // SI NO → SE PONE LINK
                        return (
                            <Link
                                key={href}
                                href={withLocale(href, currentLocale) ?? ""}
                                className={`${color} text-lg px-6 py-3 hover:bg-white/5 w-full rounded-lg flex justify-between items-center`}
                            >
                                <span className="dark:text-white/50 text-black/50">
                                    {item.code
                                        ? t_aside(`links.${code}`)
                                        : t_serviceConst(label)
                                    }
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto w-full flex flex-col gap-3 justify-start items-center">
                    <div className="relative max-w-50 w-full mx-auto flex justify-center items-center">
                        <button ref={langsMobileRef} type="button" onClick={() => {
                            if (themeButtonOpen) setThemeButtonOpen(false)
                            setLangsButtonOpen(!langsButtonOpen)
                        }} className={`px-10 py-2.5 text-center cursor-pointer dark:hover:bg-white/15 hover:bg-black/15 transition rounded-full mx-auto flex justify-center items-center gap-3 ${langsButtonOpen ? 'dark:bg-white/10 bg-black/10 dark:border-white/8 border-black/8 opacity-80' : 'opacity-100 dark:bg-white/8 bg-black/8 border-transparent'} transition-colors border`}>
                            <span className="pointer-events-none">
                                {activeLocaleName}
                            </span>
                            <i className={`${activeLocaleIcon} ${activeLocaleIcon === "icon-[openmoji--catalonia-flag]" ? 'text-2xl' : 'text-xl'}`} />
                        </button>

                        <div ref={langsDropdownRef} className={`absolute z-9999 bottom-full mb-1 left-0 w-full ${langsButtonOpen ? 'flex animate-fade-in-up' : 'hidden opacity-0'} animate-duration-200 flex-col min-w-30 rounded-lg bg-white/10 p-2`}>
                            {locales.map((locale) => (
                                <Link
                                    key={locale}
                                    href={`/${locale}${pathWithoutLocale}${search ? `?${search}` : ""}`}
                                    className={`text-sm dark:text-white/70 text-black/70 dark:hover:text-white hover:text-black transition-colors flex justify-between w-full items-center flex-row gap-1 px-3 py-3 ${currentLocale === locale ? 'dark:bg-white/8 bg-black/8' : ''} rounded-lg`}>
                                    {localeConfig[locale].label}
                                    {currentLocale === locale && (
                                        <i className="icon-[weui--done-outlined]" />
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="w-full py-1 text-sm flex md:hidden justify-center items-center flex-row gap-1 text-green-800 selection:bg-white selection:text-black">
                        <Clock />
                    </div>
                </div>
            </div>
        </>
    );
}