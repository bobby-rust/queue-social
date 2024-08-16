import Agenda from "agenda";
require("dotenv").config();

if (!process.env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI environment variable");
}

const agenda = new Agenda({
    db: {
        address: process.env.MONGODB_URI || "",
        collection: "jobs",
    },
    processEvery: "1 minute",
});

export default agenda;
