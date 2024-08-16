import agenda from "./agenda";

require("./jobs");

const startAgenda = async () => {
    try {
        await agenda.start();
        console.log("Agenda started");
    } catch (error) {
        console.error("Failed to start Agenda:", error);
    }
};

export default startAgenda;
