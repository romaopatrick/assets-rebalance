import { AppResult } from '@/domain/result';
import { capitalizeFirstLetter } from '@/utils/text';
import { AxiosResponse } from 'axios';

export function handleResponse<T>(res: AxiosResponse<AppResult<T> | any>): T | PromiseLike<T> {
    if (res.data?.errors?.length > 0) {
        throw new Error((res.data as AppResult<T>).errors.map((x) => capitalizeFirstLetter(x.message)).join(' | '));
    }

    if (res.status > 299) {
        throw new Error("We're in maintenance. Please, try again later");
    }

    const value = res.data?.value;

    return value as T;
}