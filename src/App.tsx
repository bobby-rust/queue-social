import "./App.css";
import { Link } from "react-router";

function App() {
    return (
        <div className="app">
            <div className="landing">
                <h1>Welcome to QueueSocial</h1>
                <div className="button-wrapper">
                    <Link to="/signin">
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
