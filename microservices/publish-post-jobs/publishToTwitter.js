import { TwitterApi } from "twitter-api-v2";
import XPage from "../../models/XPage";

export default submitTwitterPost = async (post) => {
    const xPage = await XPage.findOne({ pageId: post.pageId });

    const client = new TwitterApi({
        appKey: process.env.TWITTER_API_KEY,
        appSecret: process.env.TWITTER_API_SECRET,
        consumerKey: xPage.accessToken,
        consumerSecret: xPage.accessTokenSecret,
    });

    const response = await client.v2.tweet(post.content);
    return response;
};
