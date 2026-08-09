// links.ts
import Home from "../icons/Home";
import Phone from "../icons/Phone";
import Service from "../icons/Service";
import { services } from "./services";

const serviceChildren = Object.values(services).map(service => ({
    href: `/services/request/${service.slug}`,
    label: service.label,
    slug: service.slug,
}));

const baseLinks = [
    {
        href: "/",
        code: "home",
        label: "links.home",
        icon: Home,
    },
    {
        href: "/services",
        code: "services",
        label: "links.services",
        icon: Service,
        children: serviceChildren,
    },
    {
        href: "/contact",
        code: "contact",
        label: "links.contact",
        icon: Phone,

    }
]

type NavLink = {
    href?: string
    label: string
    code: string
    icon: React.ComponentType<any>
    children?: {
        href: string
        label: string
    }[]
}

export const LINKS: NavLink[] = [
    ...baseLinks,
]

export const FOOTER_LINKS: NavLink[] = [
    ...baseLinks,
    {
        href: "/privacy",
        code: "privacy",
        label: "links.privacy",
        icon: Home,
    },
    {
        href: "/cookies",
        code: "cookies",
        label: "links.cookies",
        icon: Home,
    },
] 