import { useProtectedRoute } from "../lib/auth";
import "./LinkAccount.css";

export default function LinkAccount() {
    useProtectedRoute();

    function extractUserIdFromJwt() {
        const cookie = getCookie("queue-social-session");
        console.log("Got cookie: ", cookie);
        if (!cookie) return;
        const cookieObjectBase64 = JSON.parse(atob(cookie)).token;
        console.log("Cookie object: ", cookieObjectBase64);
        const decodedToken = atob(cookieObjectBase64.split(".")[1]);
        console.log("decoded 2nd time: ", decodedToken);

        const userId = JSON.parse(decodedToken).id;
        return userId;
    }

    function getCookie(name: string) {
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
    function handleLinkFacebook() {
        const userId = extractUserIdFromJwt();
        console.log("Got user ID: ", userId);
        window.location.href = `http://localhost:3000/api/v1/fb/link?userId=${userId}`;
    }

    return (
        <div className="link-account">
            <h1>Link Account</h1>
            <ul>
                <li>
                    <button onClick={handleLinkFacebook}>Facebook</button>
                </li>
            </ul>
        </div>
    );
}
