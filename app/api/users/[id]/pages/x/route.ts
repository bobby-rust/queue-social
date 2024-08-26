export async function GET(request: Request, { params }: { params: { id: string } }) {
    /**
     * Example Request:
     */

    return new Response(JSON.stringify({ message: " Hello, world" }));
}
