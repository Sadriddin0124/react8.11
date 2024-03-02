export interface ISignUpPayload {
    id?: string, 
    full_name: FormDataEntryValue | null,
    username: FormDataEntryValue | null,
    password: FormDataEntryValue | null
}

export interface AuthPromise {
    message: string,
    admin: ISignUpPayload,
    tokens: {access_token: string, refresh_token: string}
}
export interface ISignInPayload {
    id?: string, 
    username: FormDataEntryValue | null,
    password: FormDataEntryValue | null
}