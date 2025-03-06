import { Link } from "react-router";
import "./Home.css";

export default function Home() {
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
