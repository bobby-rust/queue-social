export default async function getFacebookPages(userId: string, accessToken: string) {
    const getFbPagesUrl = `https://graph.facebook.com/v20.0/${userId}/accounts?access_token=${accessToken}`;
    const response = await fetch(getFbPagesUrl);

    const pages = await response.json();
    for (const page of pages.data) {
        const url = `https://graph.facebook.com/v20.0/${page.id}?access_token=${accessToken}&fields=picture`;
        const response = await fetch(url);
        const resJson = await response.json();
        page.picture = resJson.picture.data.url;
    }
    return pages;
}
