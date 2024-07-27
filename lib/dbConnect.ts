import mongoose from "mongoose";

declare global {
	var mongoose: any;
}

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
	throw new Error("Define a MongoDB URI in the environment variables.");
}

let cached = global.mongoose;

if (!cached) {
	global.mongoose = { conn: null, promise: null };
	cached = global.mongoose;
}

async function dbConnect() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		};
		cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
			return mongoose;
		});
	}

	try {
		cached.conn = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}

	return cached.conn;
}

export default dbConnect;
