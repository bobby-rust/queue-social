import "./SignUp.css";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormInput {
    username: string;
    email: string;
    password: string;
}

export default function SignUp() {
    const { register, handleSubmit } = useForm<FormInput>();
    const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);
    return (
        <div className="signup">
            <h1>Sign up</h1>
            <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
                <label>Username</label>
                <input {...register("username")} />
                <label>Email</label>
                <input {...register("password")} />
                <label>Password</label>
                <input {...register("password")} />
                <input type="submit" />
            </form>
        </div>
    );
}
