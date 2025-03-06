import "./Auth.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthFormInput } from "../types/auth";

export default function SignUp() {
    const { register, handleSubmit } = useForm<AuthFormInput>();
    const onSubmit: SubmitHandler<AuthFormInput> = (data: AuthFormInput) => {
        console.log(import.meta.env.VITE_API_URL);
        console.log(data);
        console.log("Sup");
    };

    return (
        <div className="auth">
            <h1>Sign Up</h1>
            <form
                className="auth-form"
                onKeyDown={(e) => e.key == "Enter" && e.preventDefault()}
            >
                <label>Username</label>
                <input {...register("username")} />
                <label>Email</label>
                <input type="email" {...register("password")} />
                <label>Password</label>
                <input type="password" {...register("password")} />
                <button onClick={handleSubmit(onSubmit)}>Sign Up</button>
            </form>
        </div>
    );
}
