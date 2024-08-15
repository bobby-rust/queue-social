import FacebookPage from "@/models/FacebookPage";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const pages = await FacebookPage.find({ userId: params.id });
    return new Response(JSON.stringify(pages));
}
