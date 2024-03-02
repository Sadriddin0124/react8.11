import { ReactNode } from "react"
import { IAuthorCard } from "./author.types"

export interface IBookPayload {
    name: FormDataEntryValue | null,
    price:number,
    code: FormDataEntryValue | null,
    author_id: number,
    janr_id: number,
    description: FormDataEntryValue | null,
    image: string
}
export interface IBookCard {
    id?: number |undefined
    name: string ,
    price:number,
    code: string,
    author_id: number,
    janr_id: number,
    description: string,
    image: string,
    author?: IAuthorCard,
    janr?: {name: ReactNode}
}

export type  EditBook = IBookCard | string