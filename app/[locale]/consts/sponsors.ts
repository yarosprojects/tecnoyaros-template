export interface Sponsor {
    id: string;
    nameKey: string;
    categoryKey: string;
    descriptionKey: string;
    badgeKey: string;
    website: string;
    logo: string;
    imageClass?: string;
}

export const SPONSORS: Sponsor[] = [
    {
        id: "joan_olive",
        nameKey: "sponsors_data.joan_olive.name",
        categoryKey: "sponsors_data.joan_olive.category",
        descriptionKey: "sponsors_data.joan_olive.description",
        badgeKey: "sponsors_data.official_sponsor",
        website: "https://joanolive.com",
        logo: "/images/sponsors/joan-olive.png",
        imageClass: "h-10 md:h-12 w-auto max-w-[200px]",
    },
    {
        id: "balas_de_viruta",
        nameKey: "sponsors_data.balas_de_viruta.name",
        categoryKey: "sponsors_data.balas_de_viruta.category",
        descriptionKey: "sponsors_data.balas_de_viruta.description",
        badgeKey: "sponsors_data.official_sponsor",
        website: "https://balasdeviruta.com",
        logo: "/images/sponsors/balas-de-viruta.png",
        imageClass: "flex-1 w-auto max-w-[150px]"
    },
];