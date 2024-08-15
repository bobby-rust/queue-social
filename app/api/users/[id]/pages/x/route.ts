import XPage from "@/models/XPage";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const pages = await XPage.find({ userId: params.id });
    return new Response(JSON.stringify(pages));
}
