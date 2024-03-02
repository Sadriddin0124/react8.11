import { $apiAuth } from "@/api/interceptors";
import { ISignUpPayload, AuthPromise, ISignInPayload } from "@/app/types/auth.types";
import { saveCookies } from "@/helpers/auth.helper";

export const signUp = async(data: ISignUpPayload):Promise<AuthPromise | undefined> => {
    try {
        const response = await $apiAuth.post("/auth/signup", data)
        return response?.data
    } catch (error) {
        console.log(error);
    }
}
export const signIn = async(data:ISignInPayload):Promise<AuthPromise | undefined>=> {
    try {
        const response = await $apiAuth.post("/auth/signin", data)
        saveCookies(response?.data?.tokens?.access_token)
        return response?.data
    } catch (error) {
        console.log(error);
    }
}