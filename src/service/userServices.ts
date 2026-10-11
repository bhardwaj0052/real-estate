import api from "./axiot";

export async function getProfile() {
    try {
        const res = await api.get("/auth")
        return res.data;
    } catch (error) {
        throw new Error("Error:---", { cause: error });
    }
}