import FacebookPage from "@/models/pages/FacebookPage";

export default async function createFacebookPages(userId: string, pages: any) {
    const fbPages = [];
    for (const page of pages) {
        const newFbPage = {
            pageId: page.id,
            userId: userId,
            name: page.name,
            accessToken: page.access_token,
            profilePicture: page.picture,
        };
        fbPages.push(newFbPage);
        await FacebookPage.findOneAndUpdate(
            { pageId: page.id },
            {
                $set: {
                    ...newFbPage,
                },
            },
            { new: true, upsert: true },
        );
    }

    return fbPages;
}
