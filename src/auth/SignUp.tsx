import "./Auth.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthFormInput } from "../types/auth";
import { Link, useNavigate } from "react-router";
import { signUp } from "../lib/auth";

export default function SignUp() {
    const { register, handleSubmit } = useForm<AuthFormInput>();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<AuthFormInput> = async (
        data: AuthFormInput,
    ) => {
        const response = await signUp(data);
        if (response.data.success) {
            navigate("/login");
        } else {
            console.log("Error signing up: ", response);
        }
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
                        <Link to="/login">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
