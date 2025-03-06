import { FormInput } from "../types/auth";

const API_URL = import.meta.env.VITE_API_URL;

export async function checkLoginStatus(): Promise<boolean> {
    const response = await fetch(API_URL + "/auth/me", {
        method: "GET",
        credentials: "include",
    });
    const json = await response.json();

    if (json.data.success) {
        return true;
    }

    return false;
}

export async function login(formInput: FormInput) {
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
    });

    const json = await response.json();
    return json;
}

export async function signUp(formInput: FormInput) {
    const response = await fetch(API_URL + "/auth/login", {
        method: "POST",
        body: JSON.stringify(formInput),
    });

    const json = await response.json();
    return json;
}
