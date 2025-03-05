import "./SignUp.css";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormInput {
    username: string;
    email: string;
    password: string;
}

export default function SignUp() {
    const { register, handleSubmit } = useForm<FormInput>();
    const onSubmit: SubmitHandler<FormInput> = (data: FormInput) => {
        console.log(import.meta.env.VITE_API_URL);
        console.log(data);
        console.log("Sup");
    };

    return (
        <div className="signup">
            <h1>Sign up</h1>
            <form
                className="signup-form"
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
