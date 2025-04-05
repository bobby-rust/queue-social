import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { logout } from "../../lib/auth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    async function handleLogout() {
        const response = await logout();
        console.log(response);
        if (response.data.success) {
            navigate("/login");
        }
    }

    return (
        <nav>
            <div className="logo">
                <NavLink to="/" className="navlink">
                    queue_social
                </NavLink>
            </div>
            <div className="nav-links">
                <NavLink to="/home" className="navlink">
                    Home
                </NavLink>

                <NavLink to="/create-post" className="navlink">
                    Create Post
                </NavLink>
                <NavLink to="/link-account" className="navlink">
                    Link Account
                </NavLink>
            </div>
            <div className="navbar-right">
                <button onClick={handleLogout}>Sign out</button>
            </div>
        </nav>
    );
}
