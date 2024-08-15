export default async function getFacebookPages(accessToken: string) {
    const getFbPagesUrl = `https://graph.facebook.com/v20.0/me/accounts?access_token=${accessToken}`;
    const response = await fetch(getFbPagesUrl);
    return await response.json();
}
