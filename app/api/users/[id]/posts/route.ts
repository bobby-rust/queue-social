export async function POST(request: Request) {
    const body = await request.json();
    const META_API_URL = "https://graph.facebook.com/v20.0";
    console.log(body);
    // const url = `${META_API_URL}/${body.pageID}/feed?access_token=${body.page.accessToken}&message=${body.content}&link=${body.link}&published=false&scheduled_publish_time=${body.scheduledPublishTime}`;
    const url = `${META_API_URL}/${body.page.id}/feed?access_token=${body.page.access_token}&message=${body.content}&link=${body.link || ""}`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            access_token: body.page.accessToken,
            message: body.content,
            link: body.link || "",
        }),
    });

    const data = await response.json();
    console.log(data);
    return new Response(JSON.stringify(data));
}

export async function GET(request: Request) {
    return new Response(JSON.stringify({ message: "Hello, Next.js!" }));
}
