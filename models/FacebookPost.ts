import mongoose from "mongoose";
import { FacebookPage } from "./FacebookPage";

export interface IFacebookPost extends mongoose.Document {
    postId: string;
    content: string;
    image: { fileUrl: string; fileId: string };
    link: string;
    page: FacebookPage;
    date: Date;
}

export const facebookPostSchema = new mongoose.Schema<IFacebookPost>({
    postId: { type: String },
    content: { type: String },
    image: { fileUrl: { type: String }, fileId: { type: String } },
    link: { type: String },
    page: { type: mongoose.Schema.Types.ObjectId, ref: "FacebookPage" },
    date: { type: Date },
});

export default mongoose.models.FacebookPost || mongoose.model("FacebookPost", facebookPostSchema);
