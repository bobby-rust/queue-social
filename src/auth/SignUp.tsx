import "./Auth.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthFormInput } from "../types/auth";
import { Link } from "react-router";

export default function SignUp() {
    const { register, handleSubmit } = useForm<AuthFormInput>();
    const onSubmit: SubmitHandler<AuthFormInput> = (data: AuthFormInput) => {
        console.log(import.meta.env.VITE_API_URL);
        console.log(data);
        console.log("Sup");
    };

    return (
        <div className="auth">
            <div className="auth-form-container">
                <h1>Sign Up</h1>
                <form
                    className="auth-form"
                    onKeyDown={(e) => e.key == "Enter" && e.preventDefault()}
                >
                    <div className="input-wrapper">
                        <label>Username</label>
                        <input
                            placeholder="Username"
                            aria-placeholder="Username"
                            {...register("username")}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            aria-placeholder="Email"
                            {...register("email")}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            aria-placeholder="Password"
                            {...register("password")}
                        />
                    </div>

                    <div>
                        <div className="checkbox-wrapper">
                            <input id="tos" type="checkbox" />
                            <label htmlFor="tos">
                                I agree to whatever this is
                            </label>
                        </div>
                    </div>
                    <button onClick={handleSubmit(onSubmit)}>Sign Up</button>
                    <p className="auth-link-msg">
                        Already have an account?{" "}
                        <Link to="/signin">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
