import React from "react";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
// export const PostSchema = new mongoose.Schema<Post>({
//     userId: { type: String },
//     pageId: { type: String },
//     content: { type: String },
//     link: { type: String },
//     image: { type: String },
//     published: { type: Boolean },
//     unixTimestamp: { type: Number },
// });
//
interface PostProps {
    post: {
        userId: string;
        pageId: string;
        pageName: string;
        content: string;
        link?: string;
        image?: string;
        unixTimestamp: number;
    };
}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Post = (props: PostProps) => {
    const date = new Date(props.post.unixTimestamp * 1000);
    return (
        <div className="flex flex-col gap-4 shadow-lg p-6 border-2 rounded-lg w-[50vw]">
            <p className="flex items-center gap-4">
                <FaFacebook size={50} />
                {props.post.pageName}
            </p>
            <p>{props.post.content}</p>
            <p>{props.post.link}</p>
            <div className="flex justify-center items-center">
                {props.post.image && (
                    <Image src={props.post.image} alt="post image" width={400} height={400} />
                )}
            </div>
            <div className="flex justify-between items-center">
                <p>{days[date.getDay()] + ", " + date.toLocaleString()}</p>
                <div className="flex gap-4">
                    <button className="btn btn-primary w-24">Edit</button>
                    <button className="btn btn-error w-24">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Post;
