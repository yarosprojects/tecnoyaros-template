import type { CountryCode } from "libphonenumber-js";

export const PHONES: {
    code: string;
    country: string;
    flag: string;
    iso: CountryCode;
}[] = [
        // --- EUROPA ---
        { code: "+34", country: "spain", flag: "icon-[twemoji--flag-spain]", iso: "ES" },
        { code: "+33", country: "france", flag: "icon-[twemoji--flag-france]", iso: "FR" },
        { code: "+49", country: "germany", flag: "icon-[twemoji--flag-germany]", iso: "DE" },
        { code: "+39", country: "italy", flag: "icon-[twemoji--flag-italy]", iso: "IT" },
        { code: "+44", country: "united_kingdom", flag: "icon-[twemoji--flag-united-kingdom]", iso: "GB" },
        { code: "+351", country: "portugal", flag: "icon-[twemoji--flag-portugal]", iso: "PT" },
        { code: "+31", country: "netherlands", flag: "icon-[twemoji--flag-netherlands]", iso: "NL" },
        { code: "+32", country: "belgium", flag: "icon-[twemoji--flag-belgium]", iso: "BE" },
        { code: "+41", country: "switzerland", flag: "icon-[twemoji--flag-switzerland]", iso: "CH" },
        { code: "+43", country: "austria", flag: "icon-[twemoji--flag-austria]", iso: "AT" },
        { code: "+46", country: "sweden", flag: "icon-[twemoji--flag-sweden]", iso: "SE" },
        { code: "+47", country: "norway", flag: "icon-[twemoji--flag-norway]", iso: "NO" },
        { code: "+45", country: "denmark", flag: "icon-[twemoji--flag-denmark]", iso: "DK" },
        { code: "+353", country: "ireland", iso: "IE", flag: "icon-[twemoji--flag-ireland]" },
        { code: "+48", country: "poland", iso: "PL", flag: "icon-[twemoji--flag-poland]" },
        { code: "+30", country: "greece", iso: "GR", flag: "icon-[twemoji--flag-greece]" },
        { code: "+358", country: "finland", iso: "FI", flag: "icon-[twemoji--flag-finland]" },
        { code: "+420", country: "czech_republic", iso: "CZ", flag: "icon-[twemoji--flag-czechia]" },
        { code: "+36", country: "hungary", iso: "HU", flag: "icon-[twemoji--flag-hungary]" },
        { code: "+40", country: "romania", iso: "RO", flag: "icon-[twemoji--flag-romania]" },
        { code: "+380", country: "ukraine", flag: "icon-[twemoji--flag-ukraine]", iso: "UA" },
        { code: "+7", country: "russia", flag: "icon-[twemoji--flag-russia]", iso: "RU" },
        { code: "+375", country: "belarus", flag: "icon-[twemoji--flag-belarus]", iso: "BY" },
        { code: "+90", country: "turkey", flag: "icon-[twemoji--flag-turkey]", iso: "TR" },
        { code: "+381", country: "serbia", flag: "icon-[twemoji--flag-serbia]", iso: "RS" },
        { code: "+385", country: "croatia", flag: "icon-[twemoji--flag-croatia]", iso: "HR" },
        { code: "+359", country: "bulgaria", flag: "icon-[twemoji--flag-bulgaria]", iso: "BG" },
        { code: "+421", country: "slovakia", flag: "icon-[twemoji--flag-slovakia]", iso: "SK" },
        { code: "+370", country: "lithuania", flag: "icon-[twemoji--flag-lithuania]", iso: "LT" },
        { code: "+371", country: "latvia", flag: "icon-[twemoji--flag-latvia]", iso: "LV" },
        { code: "+372", country: "estonia", flag: "icon-[twemoji--flag-estonia]", iso: "EE" },
        { code: "+386", country: "slovenia", flag: "icon-[twemoji--flag-slovenia]", iso: "SI" },
        { code: "+352", country: "luxembourg", flag: "icon-[twemoji--flag-luxembourg]", iso: "LU" },
        { code: "+376", country: "andorra", flag: "icon-[twemoji--flag-andorra]", iso: "AD" },
        { code: "+356", country: "malta", flag: "icon-[twemoji--flag-malta]", iso: "MT" },
        { code: "+354", country: "iceland", flag: "icon-[twemoji--flag-iceland]", iso: "IS" },
        { code: "+377", country: "monaco", flag: "icon-[twemoji--flag-monaco]", iso: "MC" },
        { code: "+373", country: "moldova", flag: "icon-[twemoji--flag-moldova]", iso: "MD" },
        { code: "+357", country: "cyprus", flag: "icon-[twemoji--flag-cyprus]", iso: "CY" },
        { code: "+382", country: "montenegro", flag: "icon-[twemoji--flag-montenegro]", iso: "ME" },
        { code: "+389", country: "north_macedonia", flag: "icon-[twemoji--flag-north-macedonia]", iso: "MK" },
        { code: "+3Albania", country: "albania", flag: "icon-[twemoji--flag-albania]", iso: "AL" },

        // --- NORTEAMÉRICA ---
        { code: "+1", country: "united_states", flag: "icon-[twemoji--flag-united-states]", iso: "US" },
        { code: "+1", country: "canada", flag: "icon-[twemoji--flag-canada]", iso: "CA" },
        { code: "+52", country: "mexico", flag: "icon-[twemoji--flag-mexico]", iso: "MX" },

        // --- CENTROAMÉRICA Y CARIBE ---
        { code: "+506", country: "costa_rica", iso: "CR", flag: "icon-[twemoji--flag-costa-rica]" },
        { code: "+507", country: "panama", iso: "PA", flag: "icon-[twemoji--flag-panama]" },
        { code: "+502", country: "guatemala", iso: "GT", flag: "icon-[twemoji--flag-guatemala]" },
        { code: "+503", country: "el_salvador", iso: "SV", flag: "icon-[twemoji--flag-el-salvador]" },
        { code: "+504", country: "honduras", iso: "HN", flag: "icon-[twemoji--flag-honduras]" },
        { code: "+505", country: "nicaragua", iso: "NI", flag: "icon-[twemoji--flag-nicaragua]" },
        { code: "+53", country: "cuba", iso: "CU", flag: "icon-[twemoji--flag-cuba]" },
        { code: "+1", country: "dominican_republic", iso: "DO", flag: "icon-[twemoji--flag-dominican-republic]" },
        { code: "+1", country: "puerto_rico", iso: "PR", flag: "icon-[twemoji--flag-puerto-rico]" },

        // --- SUDAMÉRICA ---
        { code: "+55", country: "brazil", flag: "icon-[twemoji--flag-brazil]", iso: "BR" },
        { code: "+54", country: "argentina", flag: "icon-[twemoji--flag-argentina]", iso: "AR" },
        { code: "+56", country: "chile", flag: "icon-[twemoji--flag-chile]", iso: "CL" },
        { code: "+57", country: "colombia", flag: "icon-[twemoji--flag-colombia]", iso: "CO" },
        { code: "+51", country: "peru", flag: "icon-[twemoji--flag-peru]", iso: "PE" },
        { code: "+58", country: "venezuela", iso: "VE", flag: "icon-[twemoji--flag-venezuela]" },
        { code: "+593", country: "ecuador", iso: "EC", flag: "icon-[twemoji--flag-ecuador]" },
        { code: "+591", country: "bolivia", iso: "BO", flag: "icon-[twemoji--flag-bolivia]" },
        { code: "+595", country: "paraguay", iso: "PY", flag: "icon-[twemoji--flag-paraguay]" },
        { code: "+598", country: "uruguay", iso: "UY", flag: "icon-[twemoji--flag-uruguay]" },

        // --- ASIA ---
        { code: "+81", country: "japan", flag: "icon-[twemoji--flag-japan]", iso: "JP" },
        { code: "+82", country: "south_korea", flag: "icon-[twemoji--flag-south-korea]", iso: "KR" },
        { code: "+86", country: "china", flag: "icon-[twemoji--flag-china]", iso: "CN" },
        { code: "+91", country: "india", flag: "icon-[twemoji--flag-india]", iso: "IN" },
        { code: "+66", country: "thailand", iso: "TH", flag: "icon-[twemoji--flag-thailand]" },
        { code: "+65", country: "singapore", iso: "SG", flag: "icon-[twemoji--flag-singapore]" },
        { code: "+84", country: "vietnam", iso: "VN", flag: "icon-[twemoji--flag-vietnam]" },
        { code: "+60", country: "malaysia", iso: "MY", flag: "icon-[twemoji--flag-malaysia]" },
        { code: "+62", country: "indonesia", iso: "ID", flag: "icon-[twemoji--flag-indonesia]" },
        { code: "+63", country: "philippines", iso: "PH", flag: "icon-[twemoji--flag-philippines]" },

        // --- ORIENTE MEDIO ---
        { code: "+971", country: "united_arab_emirates", flag: "icon-[twemoji--flag-united-arab-emirates]", iso: "AE" },
        { code: "+966", country: "saudi_arabia", flag: "icon-[twemoji--flag-saudi-arabia]", iso: "SA" },
        { code: "+90", country: "turkey", flag: "icon-[twemoji--flag-turkey]", iso: "TR" },
        { code: "+972", country: "israel", iso: "IL", flag: "icon-[twemoji--flag-israel]" },
        { code: "+974", country: "qatar", iso: "QA", flag: "icon-[twemoji--flag-qatar]" },

        // --- ÁFRICA ---
        { code: "+27", country: "south_africa", flag: "icon-[twemoji--flag-south-africa]", iso: "ZA" },
        { code: "+20", country: "egypt", flag: "icon-[twemoji--flag-egypt]", iso: "EG" },
        { code: "+234", country: "nigeria", flag: "icon-[twemoji--flag-nigeria]", iso: "NG" },
        { code: "+212", country: "morocco", iso: "MA", flag: "icon-[twemoji--flag-morocco]" },
        { code: "+254", country: "kenya", iso: "KE", flag: "icon-[twemoji--flag-kenya]" },

        // --- OCEANÍA ---
        { code: "+61", country: "australia", flag: "icon-[twemoji--flag-australia]", iso: "AU" },
        { code: "+64", country: "new_zealand", flag: "icon-[twemoji--flag-new-zealand]", iso: "NZ" },
    ];