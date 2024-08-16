import { exec } from "child_process";
import path from "path";
import fs from "fs";
const agendaStartPath = path.resolve(__dirname, "lib/startAgenda.ts");

// Start Agenda
const startAgenda = async () => {
    try {
        const agendaStart = require(agendaStartPath);
        await agendaStart();
        console.log("Agenda started");
    } catch (error) {
        console.error("Failed to start Agenda:", error);
    }
};

// Start Agenda and then Next.js
startAgenda().then(() => {
    exec("next dev", (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(stdout);
        console.error(stderr);
    });
});
