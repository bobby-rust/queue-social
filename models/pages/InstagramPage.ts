import mongoose from "mongoose";

interface InstagramPage {
    pageId: string;
    fbPageId: string;
    name: string;
    userId: string;
    accessToken: string;
    profilePicture: string;
}

const instagramPageSchema = new mongoose.Schema<InstagramPage>({
    pageId: { type: String, required: true, unique: true },
    fbPageId: { type: String, required: true },
    name: { type: String, required: true },
    userId: { type: String, required: true },
    accessToken: { type: String, required: true },
    profilePicture: {
        type: String,
        required: true,
        default:
            "https://scontent-cdg4-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-cdg4-1.cdninstagram.com&_nc_cat=1&_nc_ohc=pYcpZBl_EGAQ7kNvgG_buSz&edm=AGqCYasBAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AYD-XX9DgaFe7ywCfVpJp07M_I6IVXtI_MrANGdA1W93lg&oe=66D4E74F&_nc_sid=6c5dea",
    },
});

export default mongoose.models.InstagramPage ||
    mongoose.model<InstagramPage>("InstagramPage", instagramPageSchema);
export type { InstagramPage };
