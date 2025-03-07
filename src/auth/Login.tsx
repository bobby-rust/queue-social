import "./Auth.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthFormInput } from "../types/auth";
import { checkLoginStatus, login } from "../lib/auth";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function Login() {
    const { register, handleSubmit } = useForm<AuthFormInput>();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<AuthFormInput> = async (
        formInput: AuthFormInput,
    ) => {
        const response = await login(formInput);
        if (response.data.success) {
            console.log("Successfully logged in boss.");
            navigate("/home");
        }
        console.log(response);
    };

    useEffect(() => {
        const checkLogin = async () => {
            const isLoggedIn = await checkLoginStatus();
            if (isLoggedIn) {
                navigate("/home");
            }
            console.log(isLoggedIn);
        };

        checkLogin();
    }, [navigate]);

    return (
        <div className="auth">
            <div className="auth-form-container">
                <h1>Sign In</h1>
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
                            {...register("password")}
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
                    <button onClick={handleSubmit(onSubmit)}>Sign In</button>
                </form>
            </div>
        </div>
    );
}
