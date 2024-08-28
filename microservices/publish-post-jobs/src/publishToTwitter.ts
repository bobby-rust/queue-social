import { TwitterApi } from "twitter-api-v2";
import XPage from "../../../models/XPage";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
XPage;

await mongoose.connect(process.env.MONGODB_URI!);

const submitTwitterPost = async (post: any) => {
    const xPage = await mongoose.connection.models.XPage.findOne({ pageId: post.page.pageId });

    const client = new TwitterApi({
        appKey: process.env.TWITTER_API_KEY!,
        appSecret: process.env.TWITTER_API_SECRET!,
        accessToken: xPage.accessToken!,
        accessSecret: xPage.accessTokenSecret!,
    });

    const response = await client.v2.tweet(post.content);
    return response;
};

export default submitTwitterPost;
