import { useProtectedRoute } from "../lib/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import "./CreatePost.css";
import { CreatePostForm } from "../types/post";
import { createFbPost } from "../lib/fb";
import { extractUserIdFromJwt } from "../lib/utils";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const getAccounts = async () => {
    const userId = extractUserIdFromJwt();
    const response = await fetch(API_URL + `/fb/accounts/${userId}`);
    const json = await response.json();
    console.log(json);
};


export default function CreatePost() {
    useProtectedRoute();
    const [accounts, setAccounts] = useState<any>(null);

    const { register, handleSubmit } = useForm<CreatePostForm>();
    const onSubmit: SubmitHandler<CreatePostForm> = async (
        formInput: CreatePostForm,
    ) => {
        const response = await createFbPost(formInput);
        console.log(response);
    };


    useEffect(() => {
        const fetchAccounts = async () => {
          try {
            const accountsData = await getAccounts();
            setAccounts(accountsData);
          } catch (error) {
            console.error("Error fetching accounts:", error);
          }
        };
        
        fetchAccounts();
      }, []);

      useEffect(() => {
        console.log("Accounts: ", accounts);
      }, [accounts])

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
