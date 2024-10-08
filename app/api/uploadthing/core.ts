import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { UTApi } from "uploadthing/server";

export const utapi = new UTApi();

const f = createUploadthing();

const auth = (req: Request): any => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    imageUploader: f({ image: { maxFileSize: "4MB" } })
        // Set permissions and file types for this FileRoute
        .middleware(async ({ req }) => {
            // This code runs on your server before upload
            const user = await auth(req);

            console.log("uploadthing req: ", req);
            // If you throw, the user will not be able to upload
            if (!user) throw new UploadThingError("Unauthorized");

            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            console.log("Upload complete with metadata:", metadata);
            console.log("Upload complete with file:", file);
            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { fileUrl: file.url, fileId: file.key };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
