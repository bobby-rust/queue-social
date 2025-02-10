import FacebookPage from "@/models/pages/FacebookPage";

export async function GET(
    request: Request,
    props: { params: Promise<{ id: string }> },
) {
    const params = await props.params;
    const pages = await FacebookPage.find({ userId: params.id });
    console.log("Pages: ", pages);
    return new Response(JSON.stringify(pages));
}
