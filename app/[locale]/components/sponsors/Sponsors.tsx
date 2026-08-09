"use client";

import "./sponsors.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { SPONSORS } from "../../consts/sponsors";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export const Sponsors = () => {
    const supportText = useRef<HTMLSpanElement | null>(null);
    const t_sponsors = useTranslations("sponsors");
    const { locale } = useParams() as { locale: string };

    useEffect(() => {
        const el = supportText.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add("animate-zoom-in");
                }
            },
            {
                threshold: 0.6
            }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center py-20">

            {/* TITLE */}
            <h2 className="w-full dark:text-white text-black text-2xl md:text-3xl font-bold flex items-center gap-6">
                <span className="flex-1 h-px bg-linear-to-r from-transparent dark:via-white/30 via-black/30 to-transparent"></span>

                <span className="whitespace-nowrap px-2">
                    {t_sponsors("title")}
                </span>

                <span className="flex-1 h-px bg-linear-to-r from-transparent dark:via-white/30 via-black/30 to-transparent"></span>
            </h2>

            {/* BECAME A SPONSOR BUTTON */}
            <div className="w-full flex flex-row justify-center items-center pt-6 pb-8">
                <div className="flex flex-col justify-center items-center w-full">
                    <span ref={supportText} className="text-sm dark:text-white/45 text-black/45 -rotate-4 mb-4 animate-delay-700">
                        {t_sponsors("support_out_project")}
                    </span>
                    <Link href={`/${locale}/sponsors/`} className="text-sm/6 px-4 py-2 dark:bg-white/10 bg-black/10 rounded-full flex flex-row justify-center items-center gap-3 dark:hover:bg-white/13 hover:bg-black/13 transition-colors group">
                        <span className="dark:text-white/75 text-black/75">
                            {t_sponsors("become_a_sponsor")}
                        </span>
                        <i className="icon-[line-md--arrow-right] dark:text-white/75 text-black/75 dark:group-hover:text-white group-hover:text-black group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>


            {/* GRID */}
            <div className="grid grid-cols-2 gap-12 justify-center items-center mx-auto">
                {SPONSORS.map((sponsor, index) => (
                    <Link
                        key={index}
                        href={sponsor.website}
                        target="_blank"
                        className="
                            p-5 rounded-xl
                            flex items-center justify-center
                            dark:border-white/10
                            border-black/10
                            dark:hover:bg-white/5
                            hover:bg-black/5
                            transition-all
                            group
                            px-2
                        "
                    >
                        <Image
                            src={sponsor.logo}
                            alt={sponsor.nameKey}
                            width={200}
                            height={80}
                            className={`sponsor-image object-contain opacity-70 grayscale group-hover:opacity-100 dark:group-hover:grayscale-0 group-hover:grayscale-100 transition-all duration-300 ${sponsor.imageClass}`}
                        />
                    </Link>
                ))}

            </div>
        </div>
    );
};