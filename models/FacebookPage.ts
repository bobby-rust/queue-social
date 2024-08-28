import mongoose from "mongoose";

interface FacebookPage {
    pageId: string;
    userId: string;
    name: string;
    accessToken: string;
    profilePicture: string;
}

const facebookPageSchema = new mongoose.Schema<FacebookPage>({
    pageId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    accessToken: { type: String, required: true },
    profilePicture: { type: String, required: true, default: "" },
});

export default mongoose.models.FacebookPage ||
    mongoose.model<FacebookPage>("FacebookPage", facebookPageSchema);
export type { FacebookPage };
