import { AppResult } from "@/domain/result";
import { AxiosResponse } from "axios";

export function handleResponse<T>(res: AxiosResponse<AppResult<T> | any>): T {
    if (res.data?.errors)
        throw new Error((res.data as AppResult<T>).errors.map(x => x.message).join(' | '))

    if (res.status > 299)
        throw new Error("We're in maintenance. Please, try again later")

    return res.data?.value as T
}