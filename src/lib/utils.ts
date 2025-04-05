export function extractUserIdFromJwt() {
    const cookie = getCookie("queue-social-session");
    if (!cookie) return;
    const cookieObjectBase64 = JSON.parse(atob(cookie)).token;
    const decodedToken = atob(cookieObjectBase64.split(".")[1]);

    const userId = JSON.parse(decodedToken).id;
    return userId;
}

export function getCookie(name: string) {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const [key, value] = cookies[i].split("=");
        if (key === name) {
            return value;
        }
    }
    return null; // Return null if the cookie is not found
}
