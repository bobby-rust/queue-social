import mongoose from "mongoose";
import { InstagramPage } from "../pages/InstagramPage";

export interface IInstagramPost extends mongoose.Document {
    userId: string;
    postId: string;
    content: string;
    image: { fileUrl: string; fileId: string };
    link: string;
    page: InstagramPage;
    date: Date;
}

export const instagramPostSchema = new mongoose.Schema<IInstagramPost>({
    userId: { type: String, required: true },
    postId: { type: String },
    content: { type: String },
    image: { fileUrl: { type: String }, fileId: { type: String } },
    link: { type: String },
    page: { type: mongoose.Schema.Types.ObjectId, ref: "InstagramPage" },
    date: { type: Date },
});

export default mongoose.models.InstagramPost ||
    mongoose.model<IInstagramPost>("InstagramPost", instagramPostSchema);
