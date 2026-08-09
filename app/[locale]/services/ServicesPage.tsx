"use client";

import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";
import { services } from "../consts/services";
import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function ServicesPage() {
    const servicesArray = Object.values(services);
    const title = useRef<HTMLHeadingElement>(null);
    const t_serviceConst = useTranslations("const_services");
    const t_servicesTags = useTranslations("services_tags");

    useEffect(() => {
        if (!title.current) return;

        const split = new SplitText(title.current, { type: "chars" });
        const chars = split.chars;

        gsap.from(chars, {
            opacity: 0,
            y: 50,
            stagger: 0.05,
            ease: "power2.out",
            duration: 1,
        });
    }, []);

    const { locale } = useParams() as { locale: string };

    return (
        <section className="w-full min-h-screen flex flex-col items-center pt-30 pb-20 px-3 justify-center md:px-6 md:py-20">
            <h1 ref={title} className="text-5xl dark:text-white/90 text-black/90 mb-5 uppercase font-bold">
                {t_servicesTags("title")}
            </h1>
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">

                {servicesArray.map((service, i) => {

                    const isTop = i < 2;
                    const { id, slug, image, label, description } = service;

                    return (
                        <div
                            style={{ animationDelay: `${i * 200}ms` }}
                            key={id}
                            className={`overflow-hidden group relative animate-blurred-fade-in p-8 rounded-2xl border dark:border-white/10 border-black/10 
                            bg-linear-to-b dark:from-white/5 from-black/5 dark:to-white/2 to-black/2
                            backdrop-blur-xl hover:shadow-xl hover:shadow-green-500/10 
                            transition-all duration-300 flex flex-col justify-start items-start md:pb-20
                            ${isTop ? "lg:col-span-3" : "lg:col-span-2"}`}
                        >

                            <div className="flex flex-wrap">
                                <div>
                                    {/* ICON BOX */}
                                    <div className="flex flex-col justify-start items-center gap-7 md:block">
                                        <Image
                                            src={image}
                                            alt={label}
                                            width={96}
                                            height={96}
                                            priority
                                            className={`object-cover flex items-center justify-center ${isTop ? 'w-25 h-25' : 'w-20 h-20'} rounded-2xl border dark:border-white/10 border-black/10 shadow-[0_0_30px_rgba(34,197,94,0.45)] dark:shadow-[0_0_30px_rgba(34,197,94,0.25)] shrink-0 float-left mb-4 mr-4`}
                                        />
                                        <div className="flex flex-col md:block">
                                            <h2 className="dark:text-white text-black text-xl font-semibold leading-tight">
                                                {t_serviceConst(label)}
                                            </h2>

                                            <p className="dark:text-white/60 text-black/60 text-sm leading-relaxed max-w-md mt-3">
                                                {t_serviceConst(description)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-9 md:pt-0 md:opacity-0 opacity-100 top-0 md:group-hover:opacity-100 md:bg-linear-to-b md:from-5% dark:md:via-black/80 md:via-white/80 dark:md:to-black/90 md:to-white/90 bg-transparent md:z-100 md:translate-y-5 md:group-hover:translate-y-0 transition-all md:absolute md:bottom-5 md:left-0 w-full md:h-full flex justify-center items-end md:pb-5">
                                <Link
                                    href={`/${locale}/services/request/${slug}`}
                                    className="md:px-6 md:py-2 px-8 py-3 rounded-full border dark:border-white/15 border-black/15 dark:text-white/80 text-black/80 transition-all duration-300 dark:hover:border-green-500/40 hover:border-green-800/40 dark:hover:text-green-400 hover:text-green-800 hover:bg-green-500/10"
                                >
                                    {t_servicesTags("request_button")}
                                </Link>
                            </div>
                        </div>
                    );
                })}

            </div>

        </section>
    );
}