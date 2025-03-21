import { useProtectedRoute } from "../lib/auth";
import "./CreatePost.css";

export default function CreatePost() {
    useProtectedRoute();

    return (
        <div className="create-post">
            <h1>Create Post</h1>
            <form className="create-post-form"></form>
        </div>
    );
}
