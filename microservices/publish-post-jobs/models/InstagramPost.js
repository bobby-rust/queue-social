import mongoose from "mongoose";
export const instagramPostSchema = new mongoose.Schema({
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
