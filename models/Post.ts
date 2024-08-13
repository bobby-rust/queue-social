import mongoose from "mongoose";

export interface Post extends mongoose.Document {
    userId: string;
    pageId: string;
    pageName: string;
    socials: string[];
    content: string;
    link?: string;
    image?: string;
    unixTimestamp: number;
}

export const PostSchema = new mongoose.Schema<Post>({
    userId: { type: String },
    pageId: { type: String },
    pageName: { type: String },
    socials: { type: [String] },
    content: { type: String },
    link: { type: String },
    image: { type: String },
    unixTimestamp: { type: Number },
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
