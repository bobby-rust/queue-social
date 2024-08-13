export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const body = await request.json();
    return new Response("Hello, Next.js!");
}
