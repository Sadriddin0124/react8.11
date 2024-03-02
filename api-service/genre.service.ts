import { $api } from "@/api/interceptors"
import { IGenresPayload } from "@/app/types/genres.types";

export const getGenre = async()=> {
    const response = await $api.get("/category/get/all")
    return response
}
export const createGenre = async(data: IGenresPayload )=> {
    const response = await $api.post("/category/create", data)
    console.log(response);
    return response
}
export const updateGenre = async(data:IGenresPayload )=> {
    const response = await $api.patch(`/category/update/${data?.id}`, data)
    return response
}
export const deleteGenre = async(id: number | undefined)=> {
    const response = await $api.delete(`/category/delete/${id}`)
    if (response?.status === 200) {
        window.location.reload()
    }
    return response
}