'use client'

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { getMeses } from '../../consts/month';

export default function Clock() {
    const [now, setNow] = useState<Date | null>(null);
    const t = useTranslations("header");
    const months = getMeses(t);

    const formatDate = (date: Date): string => {
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    const formatTime = (date: Date): string => {
        const pad = (n: number) => n.toString().padStart(2, "0");
        return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };

    useEffect(() => {
        const update = () => setNow(new Date());

        update();

        const interval = setInterval(update, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!now) {
        return <span className="opacity-0">00:00:00</span>;
    }

    return (
        <>
            <span>{formatDate(now)}</span>
            <span>{formatTime(now)}</span>
        </>
    );
}