import Cookies from "js-cookie"
export const saveCookies =(token: string)=> {
    Cookies.set("token", token)
}
export const getCookies =()=> {
    return Cookies.get("token")
}