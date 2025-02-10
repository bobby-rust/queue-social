import InstagramPage from "@/models/pages/InstagramPage";

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const pages = await InstagramPage.find({ userId: params.id });
    return new Response(JSON.stringify(pages));
}
