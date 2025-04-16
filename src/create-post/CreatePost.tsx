import { useProtectedRoute } from "../lib/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import "./CreatePost.css";
import { CreatePostForm } from "../types/post";
import { createFbPost } from "../lib/fb";
import { extractUserIdFromJwt } from "../lib/utils";
import { useEffect, useState } from "react";
import { Page } from "../types/page";

const API_URL = import.meta.env.VITE_API_URL;

const getPages = async () => {
    const userId = extractUserIdFromJwt();
    const response = await fetch(API_URL + `/fb/accounts/${userId}`);
    const json = await response.json();
    return json;
};

export default function CreatePost() {
    useProtectedRoute();

    const [pages, setPages] = useState<Page[] | null>(null);
    const { register, handleSubmit, setValue, watch } = useForm<CreatePostForm>(
        {
            defaultValues: {
                pages: [],
            },
        },
    );

    const selectedPages = watch("pages");

    // Toggle handler
    const togglePage = (page: Page) => {
        const isSelected = selectedPages?.some((p) => p.id === page.id);
        const updatedPages = isSelected
            ? selectedPages.filter((p) => p.id !== page.id)
            : [...(selectedPages ?? []), page];
        setValue("pages", updatedPages);
    };

    const onSubmit: SubmitHandler<CreatePostForm> = async (
        formInput: CreatePostForm,
    ) => {
        const response = await createFbPost(formInput);
        console.log(response);
    };

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const pagesData = await getPages();
                setPages(pagesData.data.pages);
            } catch (error) {
                console.error("Error fetching pages:", error);
            }
        };

        fetchPages();
    }, []);

    useEffect(() => {
        console.log("pages : ", pages);
    }, [pages]);

    useEffect(() => {
        console.log("Pages selected: ", selectedPages);
    }, [selectedPages]);

    return (
        <div className="create-post">
            <h1>Create Post</h1>
            <form
                className="create-post-form"
                onKeyDown={(e) => e.key == "Enter" && e.preventDefault()}
            >
                {pages &&
                    pages.map((page) => {
                        const isChecked = selectedPages?.some(
                            (p) => p.id === page.id,
                        );
                        return (
                            <div key={page.id} className="page-toggle">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => togglePage(page)}
                                    />
                                    {page.name}
                                </label>
                            </div>
                        );
                    })}
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
                    <label>Scheduled Publish Time</label>
                    <input
                        type="datetime-local"
                        {...register("scheduledPublishTime", {
                            required: true,
                        })}
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
