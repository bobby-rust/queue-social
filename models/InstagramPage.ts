import mongoose from "mongoose";

interface InstagramPage {
    pageId: string;
    fbPageId: string;
    userId: string;
    accessToken: string;
}

const instagramPageSchema = new mongoose.Schema<InstagramPage>({
    pageId: { type: String, required: true },
    fbPageId: { type: String, required: true },
    userId: { type: String, required: true },
    accessToken: { type: String, required: true },
});

export default mongoose.models.InstagramPage ||
    mongoose.model<InstagramPage>("InstagramPage", instagramPageSchema);
