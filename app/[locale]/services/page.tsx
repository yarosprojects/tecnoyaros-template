import type { Metadata } from "next";
import ServicesPage from "./ServicesPage";

export const metadata: Metadata = {
    title: "Servicios",
};

export default function Page() {
    return <ServicesPage />;
}