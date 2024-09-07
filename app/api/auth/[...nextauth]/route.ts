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
import { SessionStrategy } from "next-auth";
import { Types } from "mongoose";
import removeOldPosts from "@/lib/removeOldPosts";
import getFacebookPages from "@/lib/getFacebookPages";
import createFacebookPages from "@/lib/createFacebookPages";
import InstagramBusinessProvider from "./InstagramBusinessProvider";
import FacebookPage from "@/models/FacebookPage";
import createInstagramPages from "@/lib/createInstagramPages";
import { getServerSession } from "next-auth";

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
        async signIn({ user, account, profile }: any) {
            /**
             * What to do when Sign in request is received?
             *  Connect the social pages.
             *
             */

            const session = await getServerSession(authOptions);
            console.log("session: ", session);

            console.log("req in SignIn: ", {
                user: user,
                account: account,
                profile: profile,
            });

            await dbConnect();

            if (account.provider === "facebook_business") {
                // TODO: update pages profile pictures on sign in here. This is because the url for images changes and is not reliable for long-term storage
                const fbPages = await getFacebookPages(profile.id, account.access_token);
                console.log("Got fb pages while signing in: ", fbPages);
                createFacebookPages(user.id, fbPages.data);
            } else if (account.provider === "instagram_business") {
                if (profile?.id) {
                    const fbPages = await FacebookPage.find({ userId: session.user.id });
                    console.log("Found facebook pages in IG sign in request: ", fbPages);
                    createInstagramPages(user.id, account.access_token, fbPages);
                }
            } else if (account.provider === "twitter") {
                const oauthToken = account.oauth_token;
                const oauthTokenSecret = account.oauth_token_secret;
                console.log(oauthToken, oauthTokenSecret);

                const session = await getServerSession(authOptions);

                const dbUser = await User.findOne({ _id: session.user.id });
                console.log("USER: ", dbUser);
                if (dbUser) {
                    const page = await XPage.find({ pageId: profile.id, userId: dbUser._id });
                    console.log("PAGE: ", page);
                    if (!page || page.length === 0) {
                        await XPage.create({
                            pageId: profile.id, // ?? is this the correct ID? there are a couple IDs in the twitter request... not sure if I'll ever need this field anyways.
                            userId: dbUser._id,
                            accessToken: oauthToken,
                            accessTokenSecret: oauthTokenSecret,
                            name: profile.screen_name,
                            profilePicture: profile.profile_image_url_https,
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
        async jwt({ token }: any) {
            // token.sub is the mongo user _id field
            const dbUser = await User.findOne({ _id: token.sub });

            token.credits = dbUser.credits || 5;
            token.subscription_type = dbUser.subscription_type || null;
            token.first_name = dbUser.first_name || token.name.split(" ")[0] || "";
            token.last_name = dbUser.last_name || token.name.split(" ")[1] || "";

            return token;
        },
        async session({ session, token }: any) {
            session.accessToken = token.accessToken;
            session.user.id = token.sub;
            session.user.credits = token.credits;
            session.user.subscription_type = token.subscription_type;
            session.user.first_name = token.first_name;
            session.user.last_name = token.last_name;
            session.user.image = token.picture;

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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
