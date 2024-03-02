import { $api } from "@/api/interceptors";
import { IBookCard, IBookPayload } from "@/app/types/book.types";

export const getBooks = async() => {
    try {
        const response = await $api.get("/book")
        return response
    } catch (error) {
        console.log(error);
        
    }
}
export const getBook = async(id: number | undefined) => {
    try {
        const response = await $api.get(`/book/${id}`)
        return response
    } catch (error) {
        console.log(error);
        
    }
}
export const createBook = async(data: IBookPayload) => {
    try {
        const response = await $api.post("/book/create", data)
        return response
    } catch (error) {
        console.log(error);
        
    }
}
export const updateBook = async(data: IBookCard) => {
    try {
        const response = await $api.patch(`/book/${data?.id}`, data)
        return response
    } catch (error) {
        console.log(error);
        
    }
}
export const deleteBook = async(id: number | undefined) => {
    try {
        const response = await $api.delete(`/book/${id}`)
        return response
    } catch (error) {
        console.log(error);
        
    }
}