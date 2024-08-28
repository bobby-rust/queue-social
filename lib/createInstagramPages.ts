import InstagramPage from "@/models/InstagramPage";

export default async function createInstagramPages(
    userId: string,
    accessToken: string,
    fbPages: any,
) {
    for (const fbPage of fbPages) {
        const igResponse = await fetch(
            `https://graph.facebook.com/v20.0/me?fields=instagram_business_account&access_token=${fbPage.accessToken}`,
        );
        const igJson = await igResponse.json();
        if (igJson.instagram_business_account) {
            const url = `https://graph.facebook.com/v20.0/${igJson.instagram_business_account.id}?access_token=${accessToken}&fields=username,profile_picture_url`;
            const response = await fetch(url);
            const resJson = await response.json();
            const newIgPage = {
                fbPageId: fbPage.pageId, // facebook page ID, NOT the MongoDB ID
                name: resJson.username,
                pageId: igJson.instagram_business_account.id,
                userId: userId,
                accessToken: accessToken,
                profilePicture: resJson.profile_picture_url,
            };
            await InstagramPage.findOneAndUpdate(
                { pageId: igJson.instagram_business_account.id },
                {
                    $set: {
                        ...newIgPage,
                    },
                },
                { new: true, upsert: true },
            );
        }
    }
}
