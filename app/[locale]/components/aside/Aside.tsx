"use client";
import { LINKS } from "../../consts/links";
import './aside.css';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { withLocale } from "../../consts/helpers";
import { services } from "../../consts/services";
import { locales } from "../../consts/locales";
import { useTranslations } from "next-intl";

type StackItem = {
    label: string | null
    items: any[]
}

export const Aside = () => {
    const path = usePathname();
    const currentLocale = path.split("/")[1];
    const localeRegex = new RegExp(`^/(${locales.join("|")})`);
    const pathWithoutLocale = path.replace(localeRegex, "") || "/";
    const segments = pathWithoutLocale.split("/").filter(Boolean);
    const activeService =
        segments[0] === "services" && segments[1] === "request"
            ? segments[2]
            : null;
    const [disableTransition, setDisableTransition] = useState(false);
    const $aside = useRef<HTMLElement | null>(null);
    const [stack, setStack] = useState<StackItem[]>([{ label: null, items: LINKS }]);
    const activeServiceItem = Object.values(services).find(
        service => service.slug === activeService
    );
    const activeServiceName = activeServiceItem?.label;
    const t_aside = useTranslations("aside");
    const t_serviceConst = useTranslations("const_services");

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1160) {
                setStack([{ label: null, items: LINKS }]);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);

    }, [path]);

    useEffect(() => {
        const handleScroll = () => {
            if (!$aside.current) return;

            const progress = Math.min(window.scrollY / 250, 1);

            $aside.current.style.backgroundColor =
                `rgb(var(--aside-bg) / ${progress * 0.4})`;

            if (progress === 1) {
                $aside.current.style.boxShadow = `var(--aside-shadow)`;
            } else {
                $aside.current.style.boxShadow = "none";
            }
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const current = stack[stack.length - 1];

    const goBack = () => {
        setStack(prev => prev.slice(0, -1));
    };

    const openChildren = (label: string, children: any[]) => {
        setStack(prev => [...prev, { label, items: children }]);
    };

    return (
        <aside
            ref={$aside}
            className={`w-auto px-1 overflow-x-hidden backdrop-blur-xl fixed top-1/2 animate-zoom-in! left-0 mx-2 -translate-y-1/2 hidden md:flex flex-col justify-center items-center ${stack.length > 1 ? 'max-w-65 rounded-xl min-h-85' : 'max-w-14 min-h-50 hover:max-w-40 hover:mx-3 rounded-[50px] hover:rounded-xl'}  duration-300 group overflow-hidden flex-nowrap transition-all z-10000 ${disableTransition ? 'transition-none' : 'transition-[max-width,margin,border-radius] duration-300'}`}
            id="navigation"
            onClick={() => {
                setDisableTransition(true);
                setTimeout(() => setDisableTransition(false), 300);
            }}
        >
            <ul className={`flex flex-col justify-center items-center gap-1 w-full h-full ${stack.length > 1 ? 'animate-fade-in-left' : 'animate-fade-in-right'} animate-duration-200`}>

                {stack.length > 1 && (
                    <li className="w-full">
                        <button
                            onClick={goBack}
                            className={`group transition hover:scale-108 duration-100 origin-center flex text-sm w-full cursor-pointer ${stack.length > 1 ? 'text-left' : 'text-center'} dark:text-green-500 text-green-800 dark:hover:text-white hover:text-black py-2 px-3`}
                        >
                            <div className="flex flex-row justify-start items-center gap-2">
                                <i className="icon-[material-symbols--arrow-back] text-lg"></i>
                                <span className={`${stack.length > 1 ? 'text-wrap' : 'text-nowrap'} flex transition-all duration-300 ease-out uppercase font-medium`}>
                                    {t_aside(current.label as string)}
                                </span>
                            </div>
                        </button>
                    </li>
                )}

                {current.items.map((item: any) => {
                    const { href, code, label, icon: Icon, children } = item;
                    const isServiceSubRoute = !!activeService;
                    const isSubActive =
                        item.slug && item.slug === activeService;

                    const isActive =
                        href &&
                        (pathWithoutLocale === href ||
                            (href !== "/" && pathWithoutLocale.startsWith(href + "/")));

                    if (children) {
                        return (
                            <li key={label} className="w-full">
                                <div className="w-full flex items-center group/item hover:scale-108 transition-transform">

                                    <Link
                                        href={withLocale(href, currentLocale)}
                                        className={`transition duration-100 origin-center flex items-center gap-2 flex-1 min-w-0 text-sm py-2 px-3 ${stack.length > 1 ? "text-left" : "text-center"
                                            } ${isActive ? "dark:text-green-500 text-green-800" : "dark:text-white/30 text-black/30 dark:group-hover/item:text-white group-hover/item:text-black"}`}
                                    >
                                        {Icon && <Icon className="size-5 shrink-0" />}

                                        <div className="flex flex-col min-w-0">

                                            <span
                                                className={`${stack.length > 1 ? "text-wrap" : "text-nowrap"
                                                    } transition-all duration-300 ease-out ${stack.length > 1
                                                        ? "opacity-100"
                                                        : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-left"
                                                    }`}
                                            >
                                                {t_aside(`links.${code}`)}
                                            </span>

                                            {isServiceSubRoute && (
                                                <span className="truncate translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 text-[10px] opacity-0 transition-all duration-300 text-left dark:text-white/30 text-black/80">
                                                    {activeServiceName && t_serviceConst(activeServiceName)}
                                                </span>
                                            )}
                                        </div>
                                    </Link>

                                    <button
                                        className={`opacity-0 group-hover:opacity-100 transition-all group-hover/item:scale-108 duration-100 ${isActive
                                            ? "dark:text-green-500 text-green-800"
                                            : "dark:text-white/30 text-black/30 dark:group-hover/item:text-white group-hover/item:text-black"
                                            } p-1 flex items-center justify-center dark:hover:bg-white/10 hover:bg-black/10 rounded-sm cursor-pointer`}
                                        type="button"
                                        onClick={() => openChildren(label, children)}
                                    >
                                        <i className="icon-[material-symbols--chevron-right] text-xl"></i>
                                    </button>

                                </div>
                            </li>
                        );
                    }

                    return (
                        <li key={label} className="w-full">
                            <Link
                                href={withLocale(href, currentLocale)}
                                className={`group transition duration-100 origin-center flex text-sm w-full ${stack.length > 1 ? 'text-left' : 'text-center hover:scale-108'} ${isSubActive
                                    ? 'dark:text-white text-black' : isActive ? 'dark:text-green-500 text-green-800' : `dark:text-white/30 text-black/40 ${stack.length > 1 ? 'dark:hover:text-white/60 hover:text-black/60' : 'dark:hover:text-white hover:text-black'}`} py-2 px-3`}
                            >
                                <div className="flex flex-row justify-start items-center gap-2">
                                    {Icon && <Icon className="size-5" />}
                                    <span
                                        className={`${stack.length > 1 ? 'text-wrap' : 'text-nowrap'} flex transition-all duration-300 ease-out ${stack.length > 1
                                            ? 'opacity-100'
                                            : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                                            }`}
                                    >
                                        {item.code
                                            ? t_aside(`links.${code}`)
                                            : t_serviceConst(label)
                                        }
                                    </span>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};