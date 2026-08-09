import web_develomlopment from "../../../public/images/services/web_development.png";
import playstation from "../../../public/images/services/playstation.png";
import pc_mantainance from "../../../public/images/services/pc_mantainance.png";
import windows from "../../../public/images/services/windows.png";
import pc from "../../../public/images/services/pc.png";

export const services = {
    web_development: {
        id: "web_development",
        label: "web_development.label",
        description: "web_development.description",
        icon: "icon-[tabler--code] text-xl",
        image: web_develomlopment.src,
        slug: "web-development",
    },

    ps_maintenance: {
        id: "ps_maintenance",
        label: "ps_maintenance.label",
        description: "ps_maintenance.description",
        icon: "icon-[simple-icons--playstation] text-xl",
        image: playstation.src,
        slug: "ps-maintenance",
    },

    pc_maintenance: {
        id: "pc_maintenance",
        label: "pc_maintenance.label",
        description: "pc_maintenance.description",
        icon: "icon-[ls--pc] text-base",
        image: pc_mantainance.src,
        slug: "pc-maintenance",
    },

    windows_formatting: {
        id: "windows_formatting",
        label: "windows_formatting.label",
        description: "windows_formatting.description",
        icon: "icon-[uil--windows] text-xl",
        image: windows.src,
        slug: "windows-formatting",
    },

    pc_assembly: {
        id: "pc_assembly",
        label: "pc_assembly.label",
        description: "pc_assembly.description",
        icon: "icon-[bi--pc-display]",
        image: pc.src,
        slug: "pc-assembly",
    },
};

export const services_labels = [
    { 
        label: "web_development.short", 
        icon: "icon-[tabler--code] text-xl dark:text-white/80 text-black/80", 
        textStyles: "text-[11px] dark:text-white/70 text-black/70" },
    { 
        label: "ps_maintenance.short", 
        icon: "icon-[simple-icons--playstation] text-xl dark:text-white/80 text-black/80", 
        textStyles: "text-[11px] dark:text-white/70 text-black/70" },
    { 
        label: "pc_maintenance.short", 
        icon: "icon-[ls--pc] text-base dark:text-white/80 text-black/80",
        textStyles: "text-[11px] dark:text-white/70 text-black/70"
    },
    { 
        label: "windows_formatting.short", 
        icon: "icon-[uil--windows] text-xl dark:text-white/80 text-black/80", 
        textStyles: "text-[11px] dark:text-white/70 text-black/70" },
    { 
        label: "pc_assembly.short", 
        icon: "icon-[bi--pc-display] dark:text-white/80 text-black/80", 
        textStyles: "text-[11px] dark:text-white/70 text-black/70" },
];