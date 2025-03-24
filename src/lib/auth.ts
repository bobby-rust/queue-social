import { useNavigate } from "react-router";
import { AuthFormInput } from "../types/auth";
import { useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export function useProtectedRoute() {
    const navigate = useNavigate();
    useEffect(() => {
        const checkLogin = async () => {
            const isLoggedIn = await checkLoginStatus();
            if (!isLoggedIn) {
                navigate("/login");
            }
        };
        checkLogin();
    }, [navigate]);
}

export async function checkLoginStatus(): Promise<boolean> {
    const response = await fetch(API_URL + "/auth/me", {
        method: "GET",
        credentials: "include",
    });
    const json = await response.json();

    return json.data.success;
}

export async function login(formInput: AuthFormInput) {
    const response = await fetch(API_URL + "/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formInput),
    });

    const json = await response.json();
    return json;
}

export async function logout() {
    const response = await fetch(API_URL + "/auth/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    const json = await response.json();
    return json;
}

export async function signUp(formInput: AuthFormInput) {
    const response = await fetch(API_URL + "/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formInput),
    });

    const json = await response.json();
    return json;
}
