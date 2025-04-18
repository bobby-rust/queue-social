import { Link } from "react-router-dom";
import "./Home.css";
import { useProtectedRoute } from "../lib/auth";
import { useEffect, useState } from "react";
import { IPost } from "../types/post";
import Post from "../components/post/Post";

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
    useProtectedRoute();

    const [posts, setPosts] = useState<IPost[] | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(API_URL + "/fb/posts", {
                credentials: "include",
            });
            const json = await response.json();
            console.log("json: ", json);
            if (json.success) {
                setPosts(json.message);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="home">
            <h1>Home</h1>
            <Link to="/create-post">
                <button>Create Post</button>
            </Link>
            {posts && posts.length ? (
                posts.map((post) => {
                    return (
                        <Post
                            text={post.text}
                            imageUrl={post.imageUrl || ""}
                            pageIds={post.pageIds}
                            scheduledPublishTime={post.scheduledPublishTime}
                        />
                    );
                })
            ) : (
                <h2>No upcoming posts</h2>
            )}
        </div>
    );
}
