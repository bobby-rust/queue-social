import FacebookPage from "@/models/FacebookPage";
import InstagramPage from "@/models/InstagramPage";
import XPage from "@/models/XPage";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    console.log("Got user id: ", params.id);
    const fbPages = await FacebookPage.find({ userId: params.id });
    const igPages = await InstagramPage.find({ userId: params.id });
    const xPages = await XPage.find({ userId: params.id });
    return new Response(JSON.stringify({ facebook: fbPages, instagram: igPages, x: xPages }));
}
