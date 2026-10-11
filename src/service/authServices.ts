import type { LoginData } from "../types/login";
import type { User } from "../types/user";
import api from "./axiot";

export async function signup(body:User) {
    try {
        const res = await api.post("/user/signup",body)
        return res.data;
    } catch (error) {
        throw new Error("Error:---", { cause: error });
    }
}

export async function login(body:LoginData) {
    try {
        const res = await api.post("/auth/login",body)
        localStorage.setItem("access_token", res.data.access_token)
        localStorage.setItem("role", res.data.role)
        return res.data;
    } catch (error) {
        throw new Error("Error:---", { cause: error });
    }
}