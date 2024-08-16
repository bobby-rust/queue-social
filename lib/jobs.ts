import agenda from "./agenda";

import { Job } from "agenda";
import publishToInstagram from "./publishToInstagram";

agenda.define("publishInstagramPost", async (job: Job) => {
    const { userId, post } = job.attrs.data;

    await publishToInstagram(userId, post);
});

export default agenda;
