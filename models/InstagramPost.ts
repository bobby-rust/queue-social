import mongoose from "mongoose";
import { InstagramPage } from "./InstagramPage";

export interface IInstagramPost extends mongoose.Document {
    userId: string;
    postId: string;
    content: string;
    image: { fileUrl: string; fileId: string };
    link: string;
    page: InstagramPage;
    unixTimestamp: number;
}

export const instagramPostSchema = new mongoose.Schema<IInstagramPost>({
    userId: { type: String, required: true },
    postId: { type: String },
    content: { type: String },
    image: { fileUrl: { type: String }, fileId: { type: String } },
    link: { type: String },
    page: { type: mongoose.Schema.Types.ObjectId, ref: "InstagramPage" },
    unixTimestamp: { type: Number },
});

export default mongoose.models.InstagramPost ||
    mongoose.model("InstagramPost", instagramPostSchema);
