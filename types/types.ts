import { FacebookPage } from "@/models/pages/FacebookPage";
import { InstagramPage } from "@/models/pages/InstagramPage";
import { XPage } from "@/models/pages/XPage";

export interface ISchedulePostRequest {
    userId: string;
    content: string;
    image: { fileUrl: string; fileId: string };
    link: string;
    facebook: FacebookPage[];
    instagram: InstagramPage[];
    x: XPage[];
    date: Date;
}

export interface ISchedulePostForm {
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

export interface SocialPages {
    facebook: FacebookPage[];
    instagram: InstagramPage[];
    x: XPage[];
}
