import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contacto",
};

export default function Page() {
  return <ContactPage />;
}