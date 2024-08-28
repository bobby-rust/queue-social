import { FacebookPage } from "@/models/FacebookPage";
import { InstagramPage } from "@/models/InstagramPage";
import { XPage } from "@/models/XPage";

export interface SchedulePostRequest {
    userId: string;
    content: string;
    image: { fileUrl: string; fileId: string };
    link: string;
    facebook: FacebookPage[];
    instagram: InstagramPage[];
    x: XPage[];
    unixTimestamp: number;
}
