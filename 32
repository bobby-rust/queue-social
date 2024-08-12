export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const req = await request.json();
    const url = `https://graph.facebook.com/v20.0/${id}/fields=instagram_business_account&access_token=${req.body.access_token}`;
    const response = (await fetch(url)).json();

    return new Response(JSON.stringify(response));
}
