import FacebookPage from "@/models/pages/FacebookPage";
import InstagramPage from "@/models/pages/InstagramPage";
import XPage from "@/models/pages/XPage";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    console.log("Got user id: ", params.id);
    const fbPages = await FacebookPage.find({ userId: params.id });
    const igPages = await InstagramPage.find({ userId: params.id });
    const xPages = await XPage.find({ userId: params.id });
    return new Response(JSON.stringify({ facebook: fbPages, instagram: igPages, x: xPages }));
}
