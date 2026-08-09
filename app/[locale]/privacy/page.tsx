"use client";
import { useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { email } from "../consts/metadata";

export default function Privacy() {
    const t = useTranslations("privacy");
    const updatedAt = new Date("2026-03-22");
    const rules_list = useRef<HTMLUListElement>(null);
    const { locale } = useParams() as { locale: string };

    useEffect(() => {
        if (rules_list.current) {
            const li = rules_list.current.querySelectorAll("li");
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-fade-in-up");
                    }
                });
            });

            li.forEach((item) => {
                observer.observe(item);
            });
        }
    }, []);

    return (
        <section className="w-full flex flex-col md:pt-15 pt-25 px-4">
            <div className="w-full flex justify-center items-center py-5">
                <span className="text-white/65 text-sm">
                    {t("updated_at")}{" "}
                    {updatedAt.toLocaleDateString(locale, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </span>
            </div>

            <div className="w-full flex flex-col justify-start items-center py-8 max-w-3xl mx-auto">
                <h1 className="text-white md:text-3xl text-[28px] font-semibold uppercase mb-6 text-center">
                    {t("title")}
                </h1>

                <p className="w-full text-white/80 leading-relaxed text-lg md:text-base text-center md:text-left">
                    {t("intro")}
                </p>

                <span className="w-full my-6 h-px bg-linear-to-r from-transparent via-white/30 to-transparent"></span>

                <ul ref={rules_list} className="w-full flex flex-col gap-8 list-decimal pl-6 marker:text-xl md:marker:text-2xl marker:font-bold marker:text-white/80 rounded-xl">

                    <li>
                        <span className="text-xl md:text-2xl text-white font-semibold">
                            {t("items.controller.title")}
                        </span>
                        <div className="py-3 text-white/80">
                            {email}
                        </div>
                    </li>

                    <li>
                        <span className="text-xl md:text-2xl text-white font-semibold">
                            {t("items.data_collected.title")}
                        </span>
                        <div className="py-3 text-white/80">
                            {t("items.data_collected.desc")}
                        </div>
                    </li>

                    <li>
                        <span className="text-xl md:text-2xl text-white font-semibold">
                            {t("items.purpose.title")}
                        </span>
                        <div className="py-3 text-white/80">
                            {t("items.purpose.desc")}
                        </div>
                    </li>

                    <li>
                        <span className="text-xl md:text-2xl text-white font-semibold">
                            {t("items.legal_basis.title")}
                        </span>
                        <div className="py-3 text-white/80">
                            {t("items.legal_basis.desc")}
                        </div>
                    </li>

                    <li>
                        <span className="text-xl md:text-2xl text-white font-semibold">
                            {t("items.retention.title")}
                        </span>
                        <div className="py-3 text-white/80">
                            {t("items.retention.desc")}
                        </div>
                    </li>

                    <li>
                        <span className="text-xl md:text-2xl text-white font-semibold">
                            {t("items.transfers.title")}
                        </span>
                        <div className="py-3 text-white/80">
                            {t("items.transfers.desc")}
                        </div>
                    </li>

                    <li>
                        <span className="text-xl md:text-2xl text-white font-semibold">
                            {t("items.rights.title")}
                        </span>
                        <div className="py-3 text-white/80">
                            {t("items.rights.desc")}
                        </div>
                    </li>

                    <li>
                        <span className="text-xl md:text-2xl text-white font-semibold">
                            {t("items.security.title")}
                        </span>
                        <div className="py-3 text-white/80">
                            {t("items.security.desc")}
                        </div>
                    </li>

                    <li>
                        <span className="text-xl md:text-2xl text-white font-semibold">
                            {t("items.cookies.title")}
                        </span>
                        <div className="py-3 text-white/80">
                            {t("items.cookies.desc")}
                        </div>
                    </li>

                    <li>
                        <span className="text-xl md:text-2xl text-white font-semibold">
                            {t("items.modifications.title")}
                        </span>
                        <div className="py-3 text-white/80">
                            {t("items.modifications.desc")}
                        </div>
                    </li>

                </ul>
            </div>
        </section>
    );
}