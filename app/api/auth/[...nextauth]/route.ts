import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { FacebookBusinessProvider } from "./FacebookBusinessProvider";
import dbConnect from "@/lib/dbConnect";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import User from "@/models/User";
import Post from "@/models/Post";
import FacebookPage from "@/models/FacebookPage";
import InstagramPage from "@/models/InstagramPage";
import { getServerSession, SessionStrategy } from "next-auth";
import { Types } from "mongoose";

const dbAdapter = MongoDBAdapter(clientPromise);

export const authOptions = {
    debug: true,
    adapter: {
        ...dbAdapter,
        async createUser(user: any) {
            await dbConnect();
            const newUser = {
                id: new Types.ObjectId().toString(),
                name: user.name,
                email: user.email,
                password: user.password,
                first_name: user.name.split(" ")[0] || "",
                last_name: user.name.split(" ")[1] || "",
                credits: 5,
                subscription_type: null,
                emailVerified: user.emailVerified,
                image: user.image,
            };

            await dbAdapter.createUser!(newUser);
            return newUser;
        },
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any) {
                await dbConnect();
                const user = await User.findOne({ email: credentials.email });
                if (!user) {
                    throw new Error("Email not found");
                }
                if (!user?.password) {
                    throw new Error("Password not found");
                }

                return user || null;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            allowDangerousEmailAccountLinking: true,
        }),
        FacebookBusinessProvider,
    ],
    callbacks: {
        async signIn(request: any) {
            await dbConnect();
            if (request.account.provider === "facebook_business") {
                console.log("Sign in request from facebook: ", request);
                const session = await getServerSession(authOptions);
                if (session) {
                    /**
                     * Find user in db,
                     * if user not found, wtf is going on? so throw some crazy error
                     * link new fb business account to user by adding their facebook account to their user object
                     * update user object in db with new fb business account
                     */
                    const getFbPagesUrl = `https://graph.facebook.com/v20.0/me/accounts?access_token=${request.account.access_token}`;
                    const response = await fetch(getFbPagesUrl);
                    const pages = await response.json();
                    const fbPages = [];
                    for (const page of pages.data) {
                        console.log("Page name: ", page.name);
                        const newFbPage = {
                            pageId: page.id,
                            userId: session.user.id,
                            name: page.name,
                            accessToken: page.access_token,
                        };
                        fbPages.push(newFbPage);
                        await FacebookPage.findOneAndUpdate(
                            { pageId: page.id },
                            { $setOnInsert: newFbPage },
                            { new: true, upsert: true },
                        );
                    }
                    console.log("Fb pages: ", fbPages);
                    for (const fbPage of fbPages) {
                        console.log("Access token: ", fbPage.accessToken);
                        const igResponse = await fetch(
                            `https://graph.facebook.com/v20.0/me?fields=instagram_business_account&access_token=${fbPage.accessToken}`,
                        );

                        console.log("sent req: ", igResponse);
                        const igJson = await igResponse.json();
                        console.log("IG response: ", igJson);
                        if (igJson.instagram_business_account) {
                            const newIgPage = {
                                fbPageId: fbPage.pageId, // facebook page ID, NOT the MongoDB ID
                                name: fbPage.name,
                                pageId: igJson.instagram_business_account.id,
                                userId: session.user.id,
                                accessToken: request.account.access_token,
                            };
                            await InstagramPage.findOneAndUpdate(
                                { pageId: igJson.instagram_business_account.id },
                                { $setOnInsert: newIgPage },
                                { new: true, upsert: true },
                            );
                        }
                    }
                }
            }

            return true;
        },
        async redirect({ url, baseUrl }: any) {
            return baseUrl;
        },
        async jwt({ token }: any) {
            await dbConnect();
            const user = await User.findOne({ email: token.email });
            if (user) {
                token.user_id = user._id.toString();
                token.first_name = user.first_name;
                token.last_name = user.last_name;
                token.credits = user.credits;
                token.subscription_type = user.subscription_type;
                // token.image = user.image;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (session) {
                session.user.id = token.user_id;
                session.user.credits = token.credits;
                session.user.subscription_type = token.subscription_type;
                session.user.first_name = token.first_name;
                session.user.last_name = token.last_name;
                // If I set this to "token.image", it just gets set to "token.picture" anyways ??
                session.user.image = token.picture; // I have no idea how it gets set to "picture" instead of "image"

                // Delete old posts from db
                const now = new Date();
                const unixTimestampNow = Math.floor(now.getTime() / 1000);
                // const unixTimestamp = Math.floor(date.getTime() / 1000);
                // post.unixTimestamp = unixTimestamp;

                // console.log(unixTimestamp);
                // console.log(new Date(unixTimestamp * 1000).toString());
                const posts = await Post.find({ userId: session.user.id });

                for (const post of posts) {
                    if (post.unixTimestamp < unixTimestampNow) {
                        console.log("Deleting post scheduled for time ", post.unixTimestamp);
                        await Post.deleteOne({ _id: post._id });
                    }
                }

                // const result = await Post.deleteMany({
                //     userId: session.user.id,
                //     unixTimestamp: { $lt: unixTimestampNow },
                // });
                // console.log("Deleted old posts: ", result);
            }

            return session;
        },
    },
    session: {
        strategy: "jwt" as SessionStrategy,
    },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
