import { TypeOptions, toast } from "react-toastify";

export const Notification =(value:{text: string | undefined; type: TypeOptions | undefined})=> {
    return toast( value?.text,{
        type: value?.type
    })
}