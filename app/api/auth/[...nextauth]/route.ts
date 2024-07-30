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
	adapter: {
		...dbAdapter,
		async createUser(user: any) {
			console.log("USER: ", user);
			const newUser = {
				first_name: user.name.split(" ")[0] || null,
				last_name: user.name.split(" ")[1] || null,
				email: user.email,
				password: null,
				image: user.image,
				facebook_business_pages: [],
				emailVerified: user.emailVerified,
				credits: 5,
				subscriptionType: null,
			};
			const createdUser = await dbAdapter.createUser!(newUser);
			return createdUser;
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
		async signIn({ user, account, profile, email, credentials }: any) {
			await dbConnect();
			return true;
		},
		async redirect({ url, baseUrl }: any) {
			return baseUrl;
		},
		async jwt({ token, user, account, profile, isNewUser }: any) {
			if (user) {
				token.id = user.id;
			}

			return token;
		},
		async session({ token, session }: any) {
			return session;
		},
	},
	session: {
		strategy: "jwt" as SessionStrategy,
	},
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
