import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "Please provide your first name."],
        maxlength: [60, "First name cannot be more than 60 characters"],
    },
    last_name: {
        type: String,
        required: [true, "Please provide your last name."],
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

export default mongoose.models.User || mongoose.model("User", UserSchema);
