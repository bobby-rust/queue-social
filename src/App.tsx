import "./App.css";
import { Link } from "react-router";
import Button from "./components/Button";

function App() {
    return (
        <>
            <div className="landing">
                <h1>Welcome to QueueSocial</h1>
                <div className="button-wrapper">
                    <Link to="/signin">
                        <Button text="Sign in" />
                    </Link>
                    <Link to="/signup">
                        <Button text="Sign up" />
                    </Link>
                </div>
            </div>
        </>
    );
}

export default App;
