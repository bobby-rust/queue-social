import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Agenda from "@hokify/agenda";
import mongoose from "mongoose";
import User from "../../../models/User";
import XPage from "../../../models/XPage";
import XPost from "../../../models/XPost";
import InstagramPost from "../../../models/InstagramPost";
import InstagramPage from "../../../models/InstagramPage";
import submitInstagramPost from "./publishToInstagram";
import submitTwitterPost from "./publishToTwitter";

// This is needed to register the models with mongoose...
User;
XPage;
XPost;
InstagramPost;
InstagramPage;

dotenv.config();

console.log();

const app = express();
app.use(cors());
app.use(express.json());

const con = await mongoose.connect(process.env.MONGODB_URI!);
console.log(con.models);
const PORT = process.env.PORT || 4000;

const getUsers = async () => {
    const users = await con.models.User.find();
    console.log(users);
};

console.log();
getUsers();
const agenda = new Agenda.Agenda({
    db: {
        address: process.env.MONGODB_URI!,
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
    return response;
});

agenda.define("get users", async () => {
    const users = await con.models.User.find();
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
    console.log("Hoy");
    console.log(`Listening on port ${PORT}`);
});

app.post("/schedule-job", async (req, res) => {
    const { userId, content, image, link, page, unixTimestamp, social } = req.body;

    agenda.schedule(new Date(), `publish ${social} post`, {
        userId: userId,
        content: content,
        image: image,
        link: link,
        page: page,
        unixTimestamp: unixTimestamp,
    });

    return res.status(201).json({ success: true, message: "Job scheduled" });
});
