import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/dbConnect";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

export const authOptions = {
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
		}),
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }: any) {
			await dbConnect();

			console.log(user);
			console.log(account);
			console.log(profile);
			console.log(email);
			console.log(credentials);

			return true;
		},
		async jwt({ token, user, account, profile, isNewUser }: any) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
	},
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
