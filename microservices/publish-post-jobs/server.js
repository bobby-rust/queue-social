import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Agenda from "@hokify/agenda";
import mongoose from "mongoose";
import User from "./models/User.js";
import submitInstagramPosts from "./publishToInstagram.js";

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
    const response = await submitInstagramPosts(job.attrs.data);
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

app.post("/schedule-job", (req, res) => {
    const { userId, content, image, link, igPages, unixTimestamp } = req.body;
    agenda.schedule(new Date(unixTimestamp * 1000), "publish instagram post", {
        userId: userId,
        content: content,
        image: image,
        link: link,
        igPages: igPages,
        unixTimestamp: unixTimestamp,
    });

    return res.json({ success: true, data: null });
});
