import mongoose from "mongoose";

interface User extends mongoose.Document {
    first_name: string;
    last_name: string;
    email: string;
    password: string | null;
    credits: number;
    subscription_type: string | null;
}

/* User schema corresponds to a collection in the mongodb database */
const userSchema = new mongoose.Schema<User>({
    first_name: {
        type: String,
        required: [true, "Please provide your first name."],
        maxlength: [60, "First name cannot be more than 60 characters"],
    },
    last_name: {
        type: String,
        maxlength: [60, "Last name  cannot be more than 60 characters"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email address."],
        maxlength: [60, "Email cannot be more than 60 characters"],
    },
    password: {
        type: String,
        minlength: [8, "Password must be at least 8 characters"],
        maxlength: [60, "Password cannot be more than 60 characters"],
    },
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

export default mongoose.models.User || mongoose.model<User>("User", userSchema);
export type { User };
