import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import User from "@/models/User";
import { SessionStrategy } from "next-auth";
import { getSession } from "next-auth/react";
import { Types } from "mongoose";

const dbAdapter = MongoDBAdapter(clientPromise);

export const authOptions = {
	debug: true,
	adapter: {
		...dbAdapter,
		async createUser(user: any) {
			await dbConnect();
			console.log("User in createUser: ", user);
			const newUser = {
				id: new Types.ObjectId().toString(),
				name: user.name,
				email: user.email,
				password: user.password,
				first_name: user.name.split(" ")[0] || "",
				last_name: user.name.split(" ")[1] || "",
				facebook_business_pages: [],
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
				console.log("Credentials in authorize: ", credentials);
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
		}),
	],
	callbacks: {
		async signIn(request: any) {
			await dbConnect();
			return true;
		},
		async redirect({ url, baseUrl }: any) {
			return baseUrl;
		},
		async jwt({ token }: any) {
			await dbConnect();
			const user = await User.findOne({ email: token.email });
			if (user) {
				token.first_name = user.first_name;
				token.last_name = user.last_name;
				token.facebook_business_pages = user.facebook_business_pages;
				token.credits = user.credits;
				token.subscription_type = user.subscription_type;
				// token.image = user.image;
			}
			console.log("JWT token: ", token);
			return token;
		},
		async session({ session, token }: any) {
			if (session) {
				session.user.facebook_business_pages = token.facebook_business_pages;
				session.user.credits = token.credits;
				session.user.subscription_type = token.subscription_type;
				session.user.first_name = token.first_name;
				session.user.last_name = token.last_name;
				session.user.image = token.picture;
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
