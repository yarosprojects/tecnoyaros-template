"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function CookiesPage() {
  const t = useTranslations("cookies_page");
  const updatedAt = new Date("2026-03-22");
  const rules_list = useRef<HTMLUListElement>(null);

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

  const formattedDate = updatedAt.toLocaleDateString("ca-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="w-full flex flex-col md:pt-15 pt-25 px-4">
      {/* DATA */}
      <div className="w-full flex justify-center items-center py-5">
        <span className="text-white/65 text-sm">
          {t("updated_at", { date: formattedDate })}
        </span>
      </div>

      {/* CONTINGUT */}
      <div className="w-full flex flex-col justify-start items-center py-8 max-w-3xl mx-auto">
        <h1 className="text-white md:text-3xl text-[28px] font-semibold uppercase mb-6 text-center">
          {t("title")}
        </h1>

        <p className="w-full text-white/80 leading-relaxed text-lg md:text-base text-center md:text-left">
          {t("intro")}
        </p>

        <span className="w-full my-6 h-px bg-linear-to-r from-transparent via-white/30 to-transparent"></span>

        <ul
          ref={rules_list}
          className="w-full flex flex-col gap-8 list-decimal pl-6 marker:text-xl md:marker:text-2xl marker:font-bold marker:text-white/80 rounded-xl"
        >
          <li>
            <span className="text-xl md:text-2xl text-white font-semibold">
              {t("sections.what_are.title")}
            </span>
            <div className="py-3 text-white/80">
              {t("sections.what_are.text")}
            </div>
          </li>

          <li>
            <span className="text-xl md:text-2xl text-white font-semibold">
              {t("sections.types.title")}
            </span>
            <div className="py-3 text-white/80">
              {t("sections.types.intro")}
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  <strong>{t("sections.types.necessary.label")}:</strong>{" "}
                  {t("sections.types.necessary.text")}
                </li>
                <li>
                  <strong>{t("sections.types.analytics.label")}:</strong>{" "}
                  {t("sections.types.analytics.text")}
                </li>
                <li>
                  <strong>{t("sections.types.marketing.label")}:</strong>{" "}
                  {t("sections.types.marketing.text")}
                </li>
              </ul>
            </div>
          </li>

          <li>
            <span className="text-xl md:text-2xl text-white font-semibold">
              {t("sections.purpose.title")}
            </span>
            <div className="py-3 text-white/80">
              {t("sections.purpose.text")}
            </div>
          </li>

          <li>
            <span className="text-xl md:text-2xl text-white font-semibold">
              {t("sections.management.title")}
            </span>
            <div className="py-3 text-white/80">
              {t("sections.management.text")}
            </div>
          </li>

          <li>
            <span className="text-xl md:text-2xl text-white font-semibold">
              {t("sections.storage.title")}
            </span>
            <div className="py-3 text-white/80">
              {t("sections.storage.text")}
            </div>
          </li>

          <li>
            <span className="text-xl md:text-2xl text-white font-semibold">
              {t("sections.disable.title")}
            </span>
            <div className="py-3 text-white/80">
              {t("sections.disable.text")}
            </div>
          </li>

          <li>
            <span className="text-xl md:text-2xl text-white font-semibold">
              {t("sections.third_party.title")}
            </span>
            <div className="py-3 text-white/80">
              {t("sections.third_party.text")}
            </div>
          </li>

          <li>
            <span className="text-xl md:text-2xl text-white font-semibold">
              {t("sections.legal_basis.title")}
            </span>
            <div className="py-3 text-white/80">
              {t("sections.legal_basis.text")}
            </div>
          </li>

          <li>
            <span className="text-xl md:text-2xl text-white font-semibold">
              {t("sections.modifications.title")}
            </span>
            <div className="py-3 text-white/80">
              {t("sections.modifications.text")}
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}