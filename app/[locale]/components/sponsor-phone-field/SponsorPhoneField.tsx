"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";
import { useTranslations } from "next-intl";
import { PHONES } from "../../consts/phones";

type SponsorPhoneInputProps = {
    value: string;
    onChange: (fullPhoneNumber: string) => void;
    placeholder?: string;
};

const ITEM_HEIGHT = 36;
const VISIBLE_COUNT = 8;

export default function SponsorPhoneField({
    value,
    onChange,
    placeholder = "+34 600 000 000",
}: SponsorPhoneInputProps) {
    const t_searchTags = useTranslations("search_tags");
    const t_countries = useTranslations("countries");

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(PHONES[0]);
    const [phone, setPhone] = useState(value);
    const [scrollTop, setScrollTop] = useState(0);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const currentPhoneButton = useRef<HTMLButtonElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // Animación de rebote visual al cambiar de país seleccionado
    useEffect(() => {
        const el = currentPhoneButton.current;
        if (!el) return;
        el.classList.remove("animate-zoom-in", "animate-duration-150");
        void el.offsetWidth;
        el.classList.add("animate-zoom-in", "animate-duration-150");
    }, [selected]);

    // Cerrar el dropdown al hacer clic fuera
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Notificar al padre cuando cambie el prefijo o el número
    const handlePhoneChange = (inputVal: string, currentCountry = selected) => {
        const digits = inputVal.replace(/\D/g, "").slice(0, 15);
        const formatter = new AsYouType(currentCountry.iso);
        const formatted = formatter.input(digits);
        const parsed = parsePhoneNumberFromString(digits, currentCountry.iso);

        let finalFormattedNumber = formatted;
        if (parsed && parsed.isValid()) {
            finalFormattedNumber = parsed.formatNational();
        }

        setPhone(finalFormattedNumber);
        
        // Formatear el string completo (ej: "+34 600 000 000") para el estado padre
        const fullString = finalFormattedNumber
            ? `${currentCountry.code} ${finalFormattedNumber}`
            : "";
        onChange(fullString);
    };

    const handleSelectCountry = (country: typeof PHONES[0]) => {
        setSelected(country);
        setIsOpen(false);
        handlePhoneChange(phone, country);
    };

    const filtered = useMemo(() => {
        return PHONES.filter((p) => {
            const translated = t_countries(p.country);
            return `${translated} ${p.code}`
                .toLowerCase()
                .includes(search.toLowerCase());
        });
    }, [search, t_countries]);

    const totalHeight = filtered.length * ITEM_HEIGHT;
    const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
    const endIndex = startIndex + VISIBLE_COUNT;
    const visibleItems = filtered.slice(startIndex, endIndex);

    return (
        <div ref={wrapperRef} className="relative w-full">
            <div className="relative flex items-center rounded-xl dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/10 focus-within:border-cyan-500 transition-colors">
                <input
                    type="tel"
                    name="phone"
                    id="sponsor-phone"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 pr-24 rounded-xl bg-transparent dark:text-white text-black placeholder:text-black/30 dark:placeholder:text-white/30 focus:outline-none text-sm"
                />

                <div className="absolute right-2 top-1/2 -translate-y-1/2 h-8 flex items-center">
                    <button
                        ref={currentPhoneButton}
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className={`px-2.5 py-1.5 text-xs font-mono font-semibold flex items-center gap-1.5 rounded-lg border transition-all ${
                            isOpen
                                ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                                : "border-black/10 dark:border-white/10 dark:bg-white/5 bg-black/5 dark:text-white/70 text-black/70 hover:border-cyan-500/30"
                        }`}
                    >
                        <span>{selected.code}</span>
                        <i className={selected.flag} />
                    </button>
                </div>
            </div>

            {/* DROPDOWN DE PAÍSES */}
            <div
                className={`z-50 absolute w-72 top-full mt-2 right-0 rounded-xl dark:bg-[#0c0d12] bg-white p-3 border border-cyan-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-200 ease-out origin-top-right ${
                    isOpen
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
            >
                <input
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t_searchTags("search_placeholder")}
                    className="w-full px-3 py-1.5 mb-2 border border-black/10 dark:border-white/10 dark:bg-white/5 bg-black/5 outline-none text-xs rounded-lg dark:text-white text-black focus:border-cyan-500 transition-colors"
                />

                {filtered.length > 0 && (
                    <div className="border-b border-black/10 dark:border-white/10 w-full pb-1 mb-1 flex justify-between items-center">
                        <span className="px-1 text-[10px] font-mono dark:text-white/50 text-black/50 uppercase">
                            {t_searchTags("total")}: {filtered.length}
                        </span>
                    </div>
                )}

                <div
                    ref={listRef}
                    onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
                    style={{ height: Math.min(VISIBLE_COUNT * ITEM_HEIGHT, 280) }}
                    className="w-full relative overflow-y-auto pr-1"
                >
                    <div style={{ height: totalHeight }} className="relative w-full">
                        {visibleItems.length > 0 ? (
                            visibleItems.map((item, idx) => {
                                const realIndex = startIndex + idx;
                                const countryName = t_countries(item.country);
                                return (
                                    <button
                                        key={item.iso + realIndex}
                                        type="button"
                                        onClick={() => handleSelectCountry(item)}
                                        style={{
                                            position: "absolute",
                                            top: realIndex * ITEM_HEIGHT,
                                            height: ITEM_HEIGHT,
                                        }}
                                        className={`animate-fade-in-up w-full left-0 flex items-center justify-between px-2 text-xs rounded-lg hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors text-left font-mono ${
                                            selected.iso === item.iso
                                                ? "dark:bg-white/10 bg-black/10 dark:text-white text-black"
                                                : "dark:text-white/80 text-black/80"
                                        }`}
                                    >
                                        <span className="truncate pr-2">
                                            {countryName}
                                        </span>
                                        <div className="flex items-center gap-1.5 shrink-0">
                                            <span className="text-cyan-500 font-semibold">
                                                {item.code}
                                            </span>
                                            <i className={item.flag} />
                                        </div>
                                    </button>
                                );
                            })
                        ) : (
                            <span className="dark:text-white/50 text-black/50 text-sm block text-center pt-4">
                                {t_searchTags("no_results")}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}