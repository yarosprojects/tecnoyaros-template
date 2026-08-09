"use client";
type CookiesProps = {
    onManage: () => void;
    onAccept: () => void;
    onReject: () => void;
};

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export const Cookies = ({ onManage, onAccept, onReject }: CookiesProps) => {
    const COOKIE_KEY = "cookie_preferences";
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(COOKIE_KEY);
        if (!saved) setVisible(true);
    }, []);

    const t_cookies_alert = useTranslations("cookie_alert");
    if (!visible) return null;

    return (
        <div className="z-9999 animate-fade-in-up py-6 fixed bottom-0 w-full flex justify-center items-center dark:bg-[#151515] bg-[#f2f2f2] shadow-xl shadow-white/10 backdrop-blur-2xl px-4">
            <div className="w-full md:max-w-700 mx-auto gap-6 flex justify-between items-center flex-col md:flex-row">
                <span className="dark:text-white text-black md:text-left text-center w-full md:max-w-[60%] text-sm">
                    {t_cookies_alert("this_web")}.{" "}
                    <Link
                        href="/privacy"
                        className="underline dark:text-white/80 text-black/80 dark:hover:text-white hover:text-black transition-colors"
                    >
                        {t_cookies_alert("more_info")}
                    </Link>
                </span>

                <div className="w-full md:w-auto flex flex-col md:flex-row gap-2">

                    <button
                        onClick={onManage}
                        className="cursor-pointer w-full text-sm md:w-auto py-3 md:px-4 md:py-2 rounded-full dark:bg-white/10 bg-black/10 dark:text-white text-black"
                    >
                        {t_cookies_alert("manage")}
                    </button>

                    <button
                        onClick={() => {
                            onReject();
                            setVisible(false);
                        }}
                        className="cursor-pointer w-full text-sm md:w-auto py-3 md:px-4 md:py-2 rounded-full dark:bg-white/10 bg-black/10 dark:text-white text-black"
                    >
                        {t_cookies_alert("reject_no_essentials")}
                    </button>

                    <button
                        onClick={() => {
                            onAccept();
                            setVisible(false);
                        }}
                        className="cursor-pointer w-full text-sm md:w-auto py-3 md:px-4 md:py-2 rounded-full dark:bg-green-500 bg-green-400 dark:text-black text-white"
                    >
                        {t_cookies_alert("accept")}
                    </button>

                </div>
            </div>
        </div>
    );
};