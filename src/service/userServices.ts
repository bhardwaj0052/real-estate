import type { User } from "../types/user";
import api from "./axiot";

export async function getProfile():Promise<User> {
    try {
        const res = await api.get("/auth")
        return res.data;
    } catch (error) {
        throw new Error("Error:---", { cause: error });
    }
}