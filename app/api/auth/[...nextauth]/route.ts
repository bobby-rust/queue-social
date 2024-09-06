import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookBusinessProvider from "./FacebookBusinessProvider";
import TwitterProvider from "next-auth/providers/twitter";
import dbConnect from "@/lib/dbConnect";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import User from "@/models/User";
import XPage from "@/models/XPage";
import { getServerSession, SessionStrategy } from "next-auth";
import { Types } from "mongoose";
import removeOldPosts from "@/lib/removeOldPosts";
import getFacebookPages from "@/lib/getFacebookPages";
import createFacebookPages from "@/lib/createFacebookPages";
import InstagramBusinessProvider from "./InstagramBusinessProvider";
import FacebookPage from "@/models/FacebookPage";
import createInstagramPages from "@/lib/createInstagramPages";

const dbAdapter = MongoDBAdapter(clientPromise);

export const authOptions = {
    // debug: true,
    adapter: {
        ...dbAdapter,
        async createUser(user: any) {
            await dbConnect();
            console.log("Running create user with params: ", user);
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
                console.log("Running authorize with params: ", credentials);
                await dbConnect();
                const user = await User.findOne({ email: credentials.email });
                if (!user) {
                    throw new Error("User not found");
                }

                return user;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            allowDangerousEmailAccountLinking: true,
        }),
        FacebookBusinessProvider,
        InstagramBusinessProvider,
        TwitterProvider({
            clientId: process.env.TWITTER_API_KEY ?? "",
            clientSecret: process.env.TWITTER_API_SECRET ?? "",
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    callbacks: {
        async signIn(request: any) {
            console.log("Running signIn with params: ", request);
            await dbConnect();
            if (request.account.provider === "facebook_business") {
                // TODO: update pages profile pictures on sign in here. This is because the url for images changes and is not reliable for long-term storage
                const fbPages = await getFacebookPages(
                    request.profile.id,
                    request.account.access_token,
                );
                console.log("Got fb pages while signing in: ", fbPages);
            } else if (request.account.provider === "instagram_business") {
                console.log("IG sign in request: ", request);
                if (request?.profile?.id) {
                    const fbPages = await FacebookPage.find({ userId: request.user.id });
                    console.log("Found facebook pages in IG sign in request: ", fbPages);
                    createInstagramPages(request.user.id, request.account.access_token, fbPages);
                }
            } else if (request.account.provider === "twitter") {
                const oauthToken = request.account.oauth_token;
                const oauthTokenSecret = request.account.oauth_token_secret;
                console.log(oauthToken, oauthTokenSecret);
                const user = await User.findOne({ _id: request.user.id });
                console.log("USER: ", user);
                if (user) {
                    const page = await XPage.find({ pageId: request.profile.id, userId: user._id });
                    console.log("PAGE: ", page);
                    if (!page || page.length === 0) {
                        await XPage.create({
                            pageId: request.profile.id, // ?? is this the correct ID? there are a couple IDs in the twitter request... not sure if I'll ever need this field anyways.
                            userId: user._id,
                            accessToken: oauthToken,
                            accessTokenSecret: oauthTokenSecret,
                            name: request.profile.screen_name,
                            profilePicture: request.profile.profile_image_url_https,
                        });
                    }
                }
            }

            return true;
        },
        async redirect(params: any) {
            // console.log("Running redirect with params: ", params);
            return params.baseUrl;
        },
        async jwt({ token, account }: any) {
            if (account) {
                token.accessToken = account.access_token;
                token.pageId = account.providerAccountId;
            }

            await dbConnect();
            const user = await User.findOne({ email: token.email });
            if (user) {
                token.user_id = user._id.toString();
                token.first_name = user.first_name;
                token.last_name = user.last_name;
                token.credits = user.credits;
                token.subscription_type = user.subscription_type;
            }
            return token;
        },
        async session({ session, token }: any) {
            session.accessToken = token.accessToken;
            session.user.id = token.user_id;
            session.user.credits = token.credits;
            session.user.subscription_type = token.subscription_type;
            session.user.first_name = token.first_name;
            session.user.last_name = token.last_name;
            // If I set this to "token.image", it just gets set to "token.picture" anyways ??
            session.user.image = token.picture; // I have no idea how it gets set to "picture" instead of "image"

            // Delete old posts from db
            const deleted = await removeOldPosts(session.user.id);
            console.log("Deleted old posts: ", deleted);

            return session;
        },
    },
    session: {
        strategy: "jwt" as SessionStrategy,
    },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
