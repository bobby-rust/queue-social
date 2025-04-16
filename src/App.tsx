import { useEffect } from "react";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";
import { checkLoginStatus } from "./lib/auth";

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        const checkLogin = async () => {
            const isLoggedIn = await checkLoginStatus();
            if (isLoggedIn) {
                navigate("/home");
            }
        };

        checkLogin();
    }, [navigate]);
    return (
        <div className="app">
            <div className="landing">
                <h1>Welcome to QueueSocial</h1>
                <div className="button-wrapper">
                    <Link to="/login">
                        <button>Sign In</button>
                    </Link>
                    <Link to="/signup">
                        <button>Sign Up</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default App;
