import { useProtectedRoute } from "../lib/auth";
import { extractUserIdFromJwt } from "../lib/utils";
import "./LinkAccount.css";

export default function LinkAccount() {
    useProtectedRoute();

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
