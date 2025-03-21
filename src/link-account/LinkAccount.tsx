import "./LinkAccount.css";

export default function LinkAccount() {
    function handleLinkFacebook() { }

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
