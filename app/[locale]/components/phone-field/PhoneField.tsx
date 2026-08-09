"use client";

type Props = {
    resetKey: number;
};

import { PHONES } from "../../consts/phones";
import { useState, useRef, useEffect, useMemo } from "react";
import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";
import { useTranslations } from "next-intl";

const ITEM_HEIGHT = 36;
const VISIBLE_COUNT = 8;

export default function PhoneField({ resetKey }: Props) {
    const t_form = useTranslations("form");
    const t_searchTags = useTranslations("search_tags");
    const t_countries = useTranslations("countries");
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [selected, setSelected] = useState(PHONES[0]);
    const [phone, setPhone] = useState("");
    const currentPhoneButton = useRef<HTMLButtonElement>(null);
    const [scrollTop, setScrollTop] = useState(0);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setPhone("");
    }, [resetKey]);

    useEffect(() => {
        const el = currentPhoneButton.current;
        if (!el) return;
        el.classList.remove("animate-zoom-in", "animate-duration-150");
        void el.offsetWidth;
        el.classList.add("animate-zoom-in", "animate-duration-150");
    }, [selected]);

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

    useEffect(() => {
        setPhone("");
    }, [selected]);

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
            <div className="relative group flex items-center rounded-xl border border-black/10 dark:border-white/10 dark:bg-white/2 bg-black/2 focus-within:border-emerald-500 dark:focus-within:border-emerald-400 focus-within:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300">
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={phone}
                    onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, "").slice(0, 15);
                        const formatter = new AsYouType(selected.iso);
                        const formatted = formatter.input(digits);
                        const parsed = parsePhoneNumberFromString(digits, selected.iso);

                        if (parsed && parsed.isValid()) {
                            setPhone(parsed.formatNational());
                        } else {
                            setPhone(formatted);
                        }
                    }}
                    className="w-full peer border-none outline-none p-3.5 pr-24 bg-transparent dark:text-white text-black input-normalized"
                    placeholder=" "
                />

                <label
                    htmlFor="phone"
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm dark:text-white/50 text-black/50 transition-all duration-200 peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:text-emerald-500 dark:peer-focus:text-emerald-400 not-peer-placeholder-shown:-top-2.5 not-peer-placeholder-shown:translate-y-0 not-peer-placeholder-shown:text-[11px] dark:bg-[#0c0d12] bg-white px-1 rounded font-medium"
                >
                    {t_form("phone")}
                    <span className="text-red-500 ml-1 font-bold">*</span>
                </label>

                <div className="absolute right-2 top-1/2 -translate-y-1/2 h-8 flex items-center">
                    <button
                        ref={currentPhoneButton}
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className={`px-2.5 py-1.5 text-xs font-mono font-semibold flex items-center gap-1.5 rounded-lg border transition-all ${isOpen
                                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "border-black/10 dark:border-white/10 dark:bg-white/5 bg-black/5 dark:text-white/70 text-black/70 hover:border-emerald-500/30"
                            }`}
                    >
                        <span>{selected.code}</span>
                        <i className={selected.flag} />
                    </button>
                </div>
            </div>

            {/* DROPDOWN DE PAÍSES */}
            <div
                className={`z-50 absolute w-72 bottom-full mb-2 right-0 rounded-xl dark:bg-[#0c0d12] bg-white p-3 border border-emerald-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-200 ease-out origin-bottom-right ${isOpen
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 translate-y-2 pointer-events-none"
                    }`}
            >
                <input
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t_searchTags("search_placeholder")}
                    className="w-full px-3 py-1.5 mb-2 border border-black/10 dark:border-white/10 dark:bg-white/5 bg-black/5 outline-none text-xs rounded-lg dark:text-white text-black focus:border-emerald-500 transition-colors"
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
                                        onClick={() => {
                                            setSelected(item);
                                            setIsOpen(false);
                                        }}
                                        style={{
                                            position: "absolute",
                                            top: realIndex * ITEM_HEIGHT,
                                            height: ITEM_HEIGHT,
                                        }}
                                        className={`w-full left-0 flex items-center justify-between px-2 text-xs rounded-lg hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors text-left font-mono animate-fade-in-up animate-duration-300 ${selected.iso === item.iso
                                                ? "dark:bg-white/10 bg-black/10 dark:text-white text-black"
                                                : "dark:text-white/80 text-black/80"
                                            }`}
                                    >
                                        <span className="truncate pr-2">
                                            {countryName}
                                        </span>
                                        <div className="flex items-center gap-1.5 shrink-0">
                                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                                                {item.code}
                                            </span>
                                            <i className={item.flag} />
                                        </div>
                                    </button>
                                );
                            })
                        ) : (
                            <span className="dark:text-white/50 text-black/50 text-sm animate-zoom-in animate-duration-300 block text-center pt-4">
                                {t_searchTags("no_results")}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}