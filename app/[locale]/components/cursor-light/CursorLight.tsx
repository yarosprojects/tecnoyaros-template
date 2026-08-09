"use client";

import { useEffect } from "react";

export default function CursorLight() {
    useEffect(() => {
        const light = document.getElementById("cursor-light") as HTMLDivElement | null;
        if (!light) return;

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let currentX = mouseX;
        let currentY = mouseY;

        const speed = 0.18;

        const onMouseMove = (e: MouseEvent): void => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const animate = (): void => {
            currentX += (mouseX - currentX) * speed;
            currentY += (mouseY - currentY) * speed;

            light.style.transform =
                `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;

            requestAnimationFrame(animate);
        };

        // 👇 detectar hover en elementos interactivos
        const onMouseOver = (e: MouseEvent): void => {
            const target = e.target as HTMLElement | null;
            if (!target) return;

            if (target.closest("a, button, [role='button']")) {
                document.body.classList.add("cursor-hover");
            }
        };

        const onMouseOut = (e: MouseEvent): void => {
            const target = e.target as HTMLElement | null;
            if (!target) return;

            if (target.closest("a, button, [role='button']")) {
                document.body.classList.remove("cursor-hover");
            }
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseover", onMouseOver);
        document.addEventListener("mouseout", onMouseOut);

        requestAnimationFrame(animate);

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseover", onMouseOver);
            document.removeEventListener("mouseout", onMouseOut);
        };
    }, []);

    return null;
}
