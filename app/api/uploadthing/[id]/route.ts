export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const body = await request.json();
    console.log(body);

    console.log(params);
    return new Response("Hello, Next.js!");
}
