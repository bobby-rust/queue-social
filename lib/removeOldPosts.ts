import FacebookPost from "@/models/posts/FacebookPost";
import InstagramPost from "@/models/posts/InstagramPost";

export default async function removeOldPosts(userId: string) {
    const now = new Date();
    const unixTimestampNow = Math.floor(now.getTime() / 1000);
    const fb = FacebookPost.deleteMany({
        userId: userId,
        unixTimestamp: { $lt: unixTimestampNow },
    });
    const ig = InstagramPost.deleteMany({
        userId: userId,
        unixTimestamp: { $lt: unixTimestampNow },
    });

    return await Promise.all([fb, ig]);
}
