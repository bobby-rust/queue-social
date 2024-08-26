import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Agenda from "@hokify/agenda";
import mongoose from "mongoose";
import User from "../../models/User";
import submitInstagramPost from "./publishToInstagram";
import InstagramPost from "../../models/InstagramPost";
import XPost from "../../models/XPost";
import submitTwitterPost from "./publishToTwitter";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

const agenda = new Agenda.Agenda({
    db: {
        address: process.env.MONGODB_URI,
    },
});

agenda.define("publish instagram post", async (job) => {
    console.log("Publishing post", job.attrs.data);
    const response = await submitInstagramPost(job.attrs.data);
    return await response.json();
});

agenda.define("publish twitter post", async (job) => {
    console.log("Publishing post", job.attrs.data);
    const response = await submitTwitterPost(job.attrs.data);
    return await response.json();
});

agenda.define("get users", async () => {
    const users = await User.find();
    console.log(users);
});

agenda.on("error", (err) => {
    console.log(err);
});

agenda.on("ready", () => {
    console.log("Agenda connection ready");
});

agenda.on("start", () => {
    console.log("started agenda");
});

agenda.on("fail", (err) => {
    console.log(err);
});

app.listen(PORT, async () => {
    await agenda.start();
    console.log(`Listening on port ${PORT}`);
});

app.post("/schedule-job", async (req, res) => {
    const { userId, content, image, link, igPages, unixTimestamp, xPages } = req.body;
    for (const page of igPages) {
        await InstagramPost.create({
            userId: userId,
            pageId: page.pageId,
            content: content,
            image: image,
            link: link,
            unixTimestamp: unixTimestamp,
        });

        agenda.schedule(new Date(unixTimestamp * 1000), "publish instagram post", {
            userId: userId,
            content: content,
            image: image,
            link: link,
            page: page,
            unixTimestamp: unixTimestamp,
        });
    }

    for (const page of xPages) {
        await XPost.create({
            userId: userId,
            pageId: page.pageId,
            content: content,
            image: image,
            link: link,
            unixTimestamp: unixTimestamp,
        });

        agenda.schedule(new Date(unixTimestamp * 1000), "publish twitter post", {
            userId: userId,
            content: content,
            image: image,
            link: link,
            page: page,
            unixTimestamp: unixTimestamp,
        });
    }

    return res.json({ success: true, data: null });
});
