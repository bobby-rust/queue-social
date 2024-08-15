import FacebookPage from "@/models/FacebookPage";

export default async function createFacebookPages(userId: string, pages: any) {
    const fbPages = [];
    for (const page of pages) {
        const newFbPage = {
            pageId: page.id,
            userId: userId,
            name: page.name,
            accessToken: page.access_token,
        };
        fbPages.push(newFbPage);
        await FacebookPage.findOneAndUpdate(
            { pageId: page.id },
            { $setOnInsert: newFbPage },
            { new: true, upsert: true },
        );
    }

    return fbPages;
}
