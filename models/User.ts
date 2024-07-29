import mongoose from "mongoose";

export interface User extends mongoose.Document {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	facebook_business_pages: { page_id: string; long_page_access_token: string | null };
	credits: number;
	subscription_type: string | null;
}

export interface FacebookBusinessPage extends mongoose.Document {
	page_id: string;
	long_page_access_token: string | null;
}

const FacebookBusinessPageSchema = new mongoose.Schema<FacebookBusinessPage>({
	page_id: { type: String, required: true },
	long_page_access_token: { type: String, default: null },
});

/* User schema corresponds to a collection in the mongodb database */
const UserSchema = new mongoose.Schema<User>({
	first_name: {
		type: String,
		required: [true, "Please provide your first name."],
		maxlength: [60, "First name cannot be more than 60 characters"],
	},
	last_name: {
		type: String,
		required: [true, "Please provide your last name."],
		maxlength: [60, "Last name cannot be more than 60 characters"],
	},
	email: {
		type: String,
		required: [true, "Please provide your email address."],
		maxlength: [60, "Email cannot be more than 60 characters"],
	},
	password: {
		type: String,
		required: [true, "Please provide a password."],
		maxlength: [60, "Password cannot be more than 60 characters"],
	},
	facebook_business_pages: FacebookBusinessPageSchema,
	credits: {
		/* The number of credits the user has available */
		type: Number,
		required: true,
	},
	subscription_type: {
		type: String,
		required: false,
		default: null,
	},
});

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
