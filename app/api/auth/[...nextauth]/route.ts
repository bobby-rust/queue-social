import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { signIn } from "next-auth/react";
import User from "@/models/User";
import { SessionStrategy } from "next-auth";

const dbAdapter = MongoDBAdapter(clientPromise);

export const authOptions = {
	debug: true,
	adapter: {
		...dbAdapter,
		async createUser(user: any) {
			await dbConnect();
			const newUser = new User({
				email: user.email,
				password: user.password,
				first_name: user.name.split(" ")[0] || "",
				last_name: user.name.split(" ")[1] || "",
				facebook_business_pages: [],
				credits: 5,
				subscription_type: null,
			});

			await dbAdapter.createUser!(JSON.stringify(newUser));
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
		async jwt(request: any) {
			await dbConnect();
			const user = await User.findOne({ email: request.token.email });
			if (user) {
				request.token.first_name = user.first_name;
				request.token.last_name = user.last_name;
				request.token.facebook_business_pages = user.facebook_business_pages;
				request.token.credits = user.credits;
				request.token.subscription_type = user.subscription_type;
			}
			console.log("JWT REQUEST: ", request);

			return request.token;
		},
		async session(request: any) {
			console.log("request in session: ", request);
			if (request.token) {
				request.session.user.facebook_business_pages = request.token.facebook_business_pages;
				request.session.user.credits = request.token.credits;
				request.session.user.subscription_type = request.token.subscription_type;
				request.session.user.first_name = request.token.first_name;
				request.session.user.last_name = request.token.last_name;
			}
			return request.session;
		},
	},
	session: {
		strategy: "jwt" as SessionStrategy,
	},
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
