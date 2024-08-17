import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import InstagramProvider from "next-auth/providers/instagram";
import FacebookBusinessProvider from "./FacebookBusinessProvider";
import dbConnect from "@/lib/dbConnect";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import User from "@/models/User";
import { getServerSession, SessionStrategy } from "next-auth";
import { Types } from "mongoose";
import removeOldPosts from "@/lib/removeOldPosts";
import getFacebookPages from "@/lib/getFacebookPages";
import createFacebookPages from "@/lib/createFacebookPages";
import createInstagramPagesFromFacebookPages from "@/lib/createInstagramPagesFromFacebookPages";

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
        InstagramProvider({
            clientId: process.env.INSTAGRAM_CLIENT_ID ?? "",
            clientSecret: process.env.INSTAGRAM_CLIENT_SECRET ?? "",
            authorization: {
                params: {
                    redirect_uri: "https://localhost:3000",
                },
            },
        }),
    ],
    callbacks: {
        async signIn(request: any) {
            await dbConnect();
            if (request.account.provider === "facebook_business") {
                const session = await getServerSession(authOptions);
                if (session) {
                    const pages = await getFacebookPages(request.account.access_token);
                    const fbPages = await createFacebookPages(session.user.id, pages);
                    createInstagramPagesFromFacebookPages(
                        session.user.id,
                        request.account.access_token,
                        fbPages,
                    );
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
                const deleted = await removeOldPosts(session.user.id);
                console.log("Deleted old posts: ", deleted);
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
