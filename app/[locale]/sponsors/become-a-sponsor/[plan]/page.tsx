import PlanPage from "./PlanPage";

type Props = {
    params: Promise<{
        plan: string;
    }>;
};

export default async function Page({ params }: Props) {
    const { plan } = await params;

    return (
        <PlanPage plan={plan} />
    );
}