import InstagramPage from "@/models/pages/InstagramPage";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const pages = await InstagramPage.find({ userId: params.id });
    return new Response(JSON.stringify(pages));
}
