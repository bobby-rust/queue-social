import { useProtectedRoute } from "../lib/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import "./CreatePost.css";
import { CreatePostForm } from "../types/post";
import { createFbPost } from "../lib/fb";

export default function CreatePost() {
    useProtectedRoute();

    const { register, handleSubmit } = useForm<CreatePostForm>();
    const onSubmit: SubmitHandler<CreatePostForm> = async (
        formInput: CreatePostForm,
    ) => {
        const response = await createFbPost(formInput);
        console.log(response);
    };

    return (
        <div className="create-post">
            <h1>Create Post</h1>
            <form
                className="create-post-form"
                onKeyDown={(e) => e.key == "Enter" && e.preventDefault()}
            >
                <div className="input-wrapper">
                    <label>Post Text</label>
                    <input
                        placeholder="Post Text"
                        aria-placeholder="Post Text"
                        {...register("text")}
                    />
                </div>
                <div className="input-wrapper">
                    <label>Post Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        placeholder="Post Image"
                        aria-placeholder="Post Image"
                        {...register("image")}
                    />
                </div>
                <div className="input-wrapper">
                    <button onClick={handleSubmit(onSubmit)}>
                        Schedule Post
                    </button>
                </div>
            </form>
        </div>
    );
}
