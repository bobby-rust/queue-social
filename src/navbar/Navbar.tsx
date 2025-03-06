import { NavLink } from "react-router";
import "./Navbar.css";

export default function Navbar() {
    return (
        <nav>
            <NavLink to="/home" className="navlink">
                Home
            </NavLink>
            <NavLink to="/create-post" className="navlink">
                Create Post
            </NavLink>
            <NavLink to="/create-post" className="navlink">
                Link Account
            </NavLink>
        </nav>
    );
}
