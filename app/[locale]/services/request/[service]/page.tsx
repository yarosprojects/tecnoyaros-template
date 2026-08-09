import RequestServicePage from "./RequestServicePage";
import { ViewTransition } from "react";

type Props = {
    params: Promise<{
        service: string;
    }>;
};

export default async function Page({ params }: Props) {
    const { service } = await params;

    return (
        <ViewTransition name="slide">
            <RequestServicePage service={service} />
        </ViewTransition>
    );
}