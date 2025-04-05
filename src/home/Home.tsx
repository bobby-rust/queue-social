import { Link } from "react-router-dom";
import "./Home.css";
import { useProtectedRoute } from "../lib/auth";

export default function Home() {
    useProtectedRoute();

    return (
        <div className="home">
            <h1>Home</h1>
            <h2>No upcoming posts</h2>
            <Link to="/create-post">
                <button>Create Post</button>
            </Link>
        </div>
    );
}
