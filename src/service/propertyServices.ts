import type { Property, Updatestatus } from "../types/property";
import api from "./axiot";

export async function createProperty(property:Omit<Property,"id">) {
    try {
        const res = await api.post("/properties",property)
        return res.data;
    } catch (error) {
        throw new Error("Error:---", { cause: error });
    }
}

export async function getallProperty():Promise<Property[]| []> {
    try {
        const res = await api.get("/properties")
        return res.data;
    } catch (error) {
        throw new Error("Error:---", { cause: error });
    }
}
export async function getapprovedProperty():Promise<Property[]| []> {
    try {
        const res = await api.get("/properties/approved")
        return res.data;
    } catch (error) {
        throw new Error("Error:---", { cause: error });
    }
}
export async function getPropertyById(id:string):Promise<Property| null> {
    try {
        const res = await api.get(`/properties/${id}`)
        return res.data;
    } catch (error) {
        throw new Error("Error:---", { cause: error });
    }
}
export async function removePropertyById(id:string):Promise<Property| null> {
    try {
        const res = await api.delete(`/properties/${id}`)
        return res.data;
    } catch (error) {
        throw new Error("Error:---", { cause: error });
    }
}
export async function updateStatus(body:Updatestatus):Promise<Property| null> {
    try {
        const res = await api.patch("/properties/status",body)
        return res.data;
    } catch (error) {
        throw new Error("Error:---", { cause: error });
    }
}
export async function saveProperty(id:string) {
    try {
        const res = await api.post(`/saved-properties/${id}`)
        return res.data;
    } catch (error) {
        throw new Error("Error:---", { cause: error });
    }
}
export async function getsavedProperty():Promise<Property[]| []> {
    try {
        const res = await api.get("/saved-properties")
        return res.data;
    } catch (error) {
        throw new Error("Error:---", { cause: error });
    }
}
export async function removeSavedProperty(id:string) {
    try {
        const res = await api.delete(`/saved-properties/${id}`)
        return res.data;
    } catch (error) {
        throw new Error("Error:---", { cause: error });
    }
}