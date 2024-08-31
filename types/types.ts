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
    date: Date;
}

export interface SchedulePostForm {
    content: string;
    image: { fileUrl: string; fileId: string };
    link: string;
    facebook: any[];
    instagram: any[];
    x: any[];
    date: Date;
    hour: number;
    minute: number;
    am: boolean;
    unixTimestamp: number;
    [key: string]: any;
}
