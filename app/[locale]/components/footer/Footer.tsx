"use client";

type CookiePreferences = {
    necessary: true;
    analytics: boolean;
    marketing: boolean;
};

import { FOOTER_LINKS } from "../../consts/links";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { Cookies } from "../cookies/Cookies";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export const Footer = () => {
    const path = usePathname();
    const t_servicesConst = useTranslations("const_services");
    const t_aside = useTranslations("aside");
    const t_footer = useTranslations("footer");
    const t_cookie_config = useTranslations("cookie_config");
    const searchParams = useSearchParams();
    const fullUrl = `${path}?${searchParams.toString()}`;
    const [linksHovered, setLinksHovered] = useState(false);
    const [childrenHovered, setChildrenHovered] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const dropdownRef = useRef<HTMLUListElement | null>(null);
    const highlightRef = useRef<HTMLDivElement | null>(null);
    const openManageCookies = () => setShowCookieModal(true);
    // const [manageCookiesBtnActive, setManageCookiesBtnActive] = useState(false);
    const COOKIE_KEY = "cookie_preferences";
    const clear = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };
    const moveHighlight = (el: HTMLElement) => {
        if (!dropdownRef.current || !highlightRef.current) return;

        const parentRect = dropdownRef.current.getBoundingClientRect();
        const rect = el.getBoundingClientRect();

        const offsetTop = rect.top - parentRect.top;

        highlightRef.current.style.transform = `translateY(${offsetTop}px)`;
        highlightRef.current.style.height = `${rect.height}px`;
        highlightRef.current.style.opacity = "1";
    };
    const defaultPrefs = {
        necessary: true,
        analytics: false,
        marketing: false,
    };
    const [showCookieModal, setShowCookieModal] = useState(false);
    const [prefs, setPrefs] = useState(defaultPrefs);
    const savePreferences = (newPrefs: typeof prefs) => {
        localStorage.setItem(COOKIE_KEY, JSON.stringify(newPrefs));
        setPrefs(newPrefs);
        setShowCookieModal(false);
    };

    const acceptAll = () => {
        savePreferences({
            necessary: true,
            analytics: true,
            marketing: true,
        });
    };

    const rejectAll = () => {
        savePreferences({
            necessary: true,
            analytics: false,
            marketing: false,
        });
    };
    const Switch = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => {
        return (
            <button
                type="button"
                onClick={() => onChange(!checked)}
                className={`cursor-pointer relative w-10 h-6 flex items-center rounded-full transition-all duration-300
              ${checked ? "dark:bg-green-500 bg-green-800" : "dark:bg-white/20 bg-black/20"}
            `}
            >
                <span
                    className={`absolute left-0.5 top-0.5 w-5 h-5 rounded-full dark:bg-white bg-black shadow-md transition
                    ${checked ? "translate-x-4" : "translate-x-0"}
                    `}
                />
            </button>
        );
    };
    const { locale } = useParams() as { locale: string };

    useEffect(() => {
        setShowCookieModal(false);
    }, [path]);

    useEffect(() => {
        const saved = localStorage.getItem(COOKIE_KEY);
        if (saved) {
            setShowCookieModal(false);
        }
    }, []);


    useEffect(() => {
        const saved = localStorage.getItem(COOKIE_KEY);

        if (saved) {
            try {
                setPrefs(JSON.parse(saved));
            } catch { }
        }
    }, []);

    useEffect(() => {
        clear();
        setLinksHovered(false);
        setChildrenHovered(false);
    }, [fullUrl]);

    return (
        <footer
            className="
                w-full
                dark:bg-black/60
                bg-white/60
                px-6 py-10
                flex flex-col gap-3
                items-center
                text-center
            "
        >
            <div className="w-full flex justify-center items-center flex-col">
                <div className="w-full flex flex-col justify-center items-center">
                    <div
                        className={`flex w-full flex-col justify-start md:justify-center md:flex-row gap-6 dark:text-white/50 text-black/50 text-xs px-6 py-10 md:py-2 rounded-xl transition-colors
                        }`}
                    >
                        {FOOTER_LINKS.map((link) => {
                            const { href, code, label, children } = link;

                            return (
                                <div
                                    key={href ?? label}
                                    className="flex justify-start md:justify-center items-center relative"
                                >
                                    <Link
                                        href={`/${locale}${href}`}
                                        onMouseEnter={() => {
                                            if (!children) return;
                                            clear();
                                            setLinksHovered(true);
                                        }}
                                        onMouseLeave={() => {
                                            if (!children) return;
                                            timeoutRef.current = setTimeout(() => {
                                                setLinksHovered(false);
                                                setChildrenHovered(false);
                                            }, 300);
                                        }}
                                        className={`flex text-sm md:text-[12px] cursor-pointer peer ${(linksHovered || childrenHovered) && children ? 'dark:text-white text-black' : ''} dark:hover:text-white/85 hover:text-black/85 transition-colors ${((path === href) || (children?.some(child => fullUrl === child.href))) ? "dark:text-white text-black" : ""}`}
                                    >
                                        {t_aside(`links.${code}`)}
                                    </Link>


                                    {children && (
                                        <div
                                            onMouseEnter={() => {
                                                clear();
                                                setChildrenHovered(true);
                                            }}
                                            onMouseLeave={() => {
                                                if (!children) return;
                                                timeoutRef.current = setTimeout(() => {
                                                    setLinksHovered(false);
                                                    setChildrenHovered(false);
                                                }, 300);
                                            }}
                                            className={`absolute bottom-full mb-2.5 flex-col items-center
                                        ${linksHovered || childrenHovered
                                                    ? "hidden md:flex animate-fade-in-up animate-duration-150"
                                                    : "hidden"
                                                }
                                        transition-all duration-200
                                        dark:bg-[#1f1f1f]/60 bg-[#f1f1f1]/60 backdrop-blur-2xl
                                        rounded-xl z-50
                                    `}
                                        >
                                            <ul
                                                ref={dropdownRef}
                                                className="w-full min-w-3xs p-2 rounded-lg flex flex-col items-center relative"
                                            >
                                                <div
                                                    ref={highlightRef}
                                                    className="absolute left-1/2 -translate-x-1/2 top-0 w-[95%] mx-auto dark:bg-white/5 bg-black/5 rounded-lg opacity-0 pointer-events-none transition-[transform,height,opacity] duration-300 ease-out"
                                                />

                                                {children.map((child) => {
                                                    return (
                                                        <li key={child.href} className="w-full">
                                                            <Link
                                                                href={`/${locale}${child.href}`}
                                                                onMouseEnter={(e) => moveHighlight(e.currentTarget)}
                                                                onMouseLeave={() => {
                                                                    if (highlightRef.current) {
                                                                        highlightRef.current.style.opacity = "0";
                                                                    }
                                                                }}
                                                                className={`dark:hover:text-white hover:text-black text-[12px] block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${fullUrl === child.href ? "dark:bg-white/10 bg-black/10 dark:text-white text-black" : ""
                                                                    }`}
                                                            >
                                                                {t_servicesConst(child.label)}
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="w-full flex justify-start md:justify-center items-center md:px-0 px-6  py-3">
                        <button onClick={() => { setShowCookieModal(true) }} type="button" className={`dark:text-white text-black px-6 py-2 rounded-full cursor-pointer text-[12px] border active:scale-95 transition-all ${showCookieModal ? 'dark:bg-white/6 bg-black/6 dark:hover:bg-white/8 hover:bg-black/8 border-white/20' : 'dark:bg-white/10 bg-black/10 border-transparent dark:hover:bg-white/8 hover:bg-black/8'}`}>
                            {t_footer("manage_cookies")}
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-11 flex flex-col md:flex-row items-center gap-4 text-sm dark:text-white/60 text-black/60">
                <span>© {new Date().getFullYear()} Tecno Yaros</span>
                <span className="hidden md:inline">·</span>
                <span>{t_footer("all_rights_reserved")}</span>
            </div>

            {/* MODAL COOKIES PREFERNCES */}
            {showCookieModal && (
                <div className="animate-fade-in-up px-1 animate-duration-250 fixed inset-0 z-9999 flex items-center justify-center dark:bg-black/60 bg-white/60 dark:backdrop-blur-sm backdrop-blur-[5px]">
                    <div className={`dark:bg-[#1f1f1f] bg-[#f1f1f1] rounded-2xl md:p-6 p-4 w-full ${locale === "uk-UA" ? 'md:max-w-3xl' : 'md:max-w-md'} dark:text-white text-black shadow-xl`}>

                        <h3 className="text-lg font-semibold mb-2">
                            {t_cookie_config("title")}
                        </h3>

                        <p className="text-sm dark:text-white/60 text-black/60 mb-4 text-center md:text-left">
                            {t_cookie_config("description")}
                        </p>

                        <div className="w-full h-px dark:bg-white/10 bg-black/10 mb-4"></div>

                        <div className="flex flex-col gap-3 mb-6">

                            {/* Necesarias */}
                            <div className="flex justify-between items-center">
                                <span className="text-sm">{t_cookie_config("essentials")}</span>
                                <span className="text-xs dark:text-green-500 text-green-800">{t_cookie_config("always_active")}</span>
                            </div>

                            {/* Analytics */}
                            <div className="flex justify-between items-center">
                                <span className="text-sm">{t_cookie_config("analytics")}</span>
                                <Switch
                                    checked={prefs.analytics}
                                    onChange={(value) =>
                                        setPrefs({ ...prefs, analytics: value })
                                    }
                                />
                            </div>

                            {/* Marketing */}
                            <div className="flex justify-between items-center">
                                <span className="text-sm">{t_cookie_config("marketing")}</span>
                                <Switch
                                    checked={prefs.marketing}
                                    onChange={(value) =>
                                        setPrefs({ ...prefs, marketing: value })
                                    }
                                />
                            </div>
                        </div>
                        <div className="w-full h-px dark:bg-white/10 bg-black/10 mb-4"></div>
                        <div className="w-full flex justify-start items-center mb-5">
                            <span className="dark:text-white/60 text-black/60 text-sm">
                                {t_cookie_config("more_info_about")}
                                <Link
                                    onClick={() => setShowCookieModal(false)}
                                    href={`/${locale}/privacy`}
                                    className="hover:underline ml-1 dark:text-white/70 text-black/70 dark:hover:text-white hover:text-black"
                                >
                                    {t_cookie_config("privacy_policy")}
                                </Link>
                            </span>
                        </div>

                        <div className="flex md:flex-row flex-col gap-2">
                            <button
                                onClick={rejectAll}
                                className="cursor-pointer flex-1 md:px-4 md:py-2 px-6 py-3 rounded-lg dark:bg-white/10 bg-black/10 dark:hover:bg-white/20 hover:bg-black/20 text-sm"
                            >
                                {t_cookie_config("decline")}
                            </button>

                            <button
                                onClick={() => savePreferences(prefs)}
                                className="cursor-pointer flex-1 md:px-4 md:py-2 px-6 py-3 rounded-lg dark:bg-white/20 bg-black/20 dark:hover:bg-white/30 hover:bg-black/30 text-sm"
                            >
                                {t_cookie_config("save")}
                            </button>

                            <button
                                onClick={acceptAll}
                                className="cursor-pointer flex-1 md:px-4 md:py-2 px-6 py-3 rounded-lg dark:bg-green-500 bg-green-800 dark:hover:bg-green-400 hover:bg-green-700 dark:text-black text-white text-sm"
                            >
                                {t_cookie_config("accept_all")}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Cookies
                onManage={openManageCookies}
                onAccept={acceptAll}
                onReject={rejectAll}
            />
        </footer>
    );
};

{/** 
    CARGAR LAS ANALYTICS
    if (prefs.analytics) {
        // cargar analytics script
    }
*/}