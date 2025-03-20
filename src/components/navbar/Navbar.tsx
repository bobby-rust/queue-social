import { NavLink } from "react-router";
import "./Navbar.css";

export default function Navbar() {
    return (
        <nav>
            <div className="logo">
                <NavLink to="/" className="navlink">
                    queue social
                </NavLink>
            </div>
            <div className="nav-links">
                <NavLink to="/home" className="navlink">
                    Home
                </NavLink>

                <NavLink to="/create-post" className="navlink">
                    Create Post
                </NavLink>
                <NavLink to="/create-post" className="navlink">
                    Link Account
                </NavLink>
            </div>
        </nav>
    );
}
