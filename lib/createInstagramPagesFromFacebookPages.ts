import InstagramPage from "@/models/InstagramPage";

export default async function getInstagramPagesFromFacebookPages(
    userId: string,
    accessToken: string,
    fbPages: any,
) {
    for (const fbPage of fbPages) {
        const url = `https://graph.facebook.com/v20.0/me?fields=instagram_business_account&access_token=${fbPage.accessToken}`;
        const igResponse = await fetch(url);

        const igJson = await igResponse.json();
        if (igJson.instagram_business_account) {
            const newIgPage = {
                fbPageId: fbPage.pageId, // facebook page ID, NOT the MongoDB ID
                name: fbPage.name,
                pageId: igJson.instagram_business_account.id,
                userId: userId,
                accessToken: accessToken,
            };
            await InstagramPage.findOneAndUpdate(
                { pageId: igJson.instagram_business_account.id },
                { $setOnInsert: newIgPage },
                { new: true, upsert: true },
            );
        }
    }
}
