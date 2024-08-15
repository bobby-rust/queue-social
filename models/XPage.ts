import mongoose from "mongoose";

interface XPage {
    pageId: string;
    name: string;
    userId: string;
    accessToken: string;
}

const xPageSchema = new mongoose.Schema<XPage>({
    pageId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    userId: { type: String, required: true },
    accessToken: { type: String, required: true },
});

export default mongoose.models.XPage || mongoose.model<XPage>("XPage", xPageSchema);

export type { XPage };
