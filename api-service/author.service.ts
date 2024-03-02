import { $api } from "@/api/interceptors"
import { IAuthorCard, IAuthorPayload } from "@/app/types/author.types";

export const getAuthors =async()=> {
    const response = await $api.get("/author")
    console.log(response?.data);
    return response
}
export const getAuthor =async(id: number | undefined | string)=> {
    const response = await $api.get(`/author/${id}`)
    console.log(response?.data);
    return response
}
export const createAuthors =async(data: IAuthorPayload)=> {
    const response = await $api.post("/author", data)
    return response
}
export const updateAuthors =async(data: IAuthorPayload)=> {
    const response = await $api.patch(`/author/${data?.id}`, data)
    return response
}
export const deleteAuthor =async(id: number | undefined | string)=> {
    const response = await $api.delete(`/author/${id}`)
    return response
}