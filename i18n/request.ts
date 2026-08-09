import { getRequestConfig } from "next-intl/server";
import { locales } from "@/app/[locale]/consts/locales";

import es_ES from "./messages/es-ES.json";
import en_US from "./messages/en-US.json";
import ca_ES from "./messages/ca-ES.json";

const messagesMap = {
    "es-ES": es_ES,
    "en-US": en_US,
    "ca-ES": ca_ES,
};

export default getRequestConfig(async ({ locale }) => {
    if (!locale || !locales.includes(locale as any)) {
        return {
            locale: "es-ES",
            messages: messagesMap["es-ES"],
        };
    }

    return {
        locale,
        messages: messagesMap[locale as keyof typeof messagesMap],
    };
});