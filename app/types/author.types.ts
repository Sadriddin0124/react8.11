import { ReactNode } from "react"

export interface IAuthorPayload {
    id?: string | number | undefined
    full_name: FormDataEntryValue | null
    birthdate: FormDataEntryValue | null
    country: FormDataEntryValue | null
    image: string
}
export interface IAuthorMap {
    id?: string
    full_name: ReactNode
    birthdate: ReactNode
    country: ReactNode
    image: string
}
export interface IAuthorCard {
    id?: number | string
    full_name: string
    birthdate: string
    country: string
    image: string
    createdAt?: string
    updatedAt?: string
}