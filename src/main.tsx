import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Home from "./home/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import CreatePost from "./create-post/CreatePost";
import LinkAccount from "./link-account/LinkAccount";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <div className="app-container">
                <Navbar />
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/home" element={<Home />} />
                    
                    <Route path="/login" element={<Login />} />

                    <Route path="/signup" element={<SignUp />} />

                    <Route path="/create-post" element={<CreatePost />} />

                    <Route path="/link-account" element={<LinkAccount />} /> 
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    </StrictMode>,
);
