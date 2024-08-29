import mongoose from "mongoose";
import { XPage } from "./XPage";

export interface IXPost extends mongoose.Document {
    userId: string;
    postId: string;
    content: string;
    image: { fileUrl: string; fileId: string };
    link: string;
    page: XPage;
    date: Date;
}

export const xPostSchema = new mongoose.Schema<IXPost>({
    userId: { type: String, required: true },
    postId: { type: String },
    content: { type: String },
    image: { fileUrl: { type: String }, fileId: { type: String } },
    link: { type: String },
    page: { type: mongoose.Schema.Types.ObjectId, ref: "XPage" },
    date: { type: Date },
});

export default mongoose.models.XPost || mongoose.model("XPost", xPostSchema);
