import { AppResult } from '@/lib/domain/result';
import { capitalizeFirstLetter } from '@/lib/utils/text';
import { HttpStatusCode } from 'axios';

export async function handleResponse<T>(response: Response): Promise<T> {
    console.debug("response status", response.status, response.statusText, response.bodyUsed)
    
    if(response.status === Number(HttpStatusCode.NoContent))
        return undefined as T

    try {
        const data: AppResult<T> | any = await response.json();
        console.log("response data", data)
        if (data?.errors?.length > 0) {
            throw new Error(
                data.errors.map((x: { message: string }) => capitalizeFirstLetter(x.message)).join(' | ')
            );
        }
        
        if (!response.ok) {
            throw new Error("We're in maintenance. Please, try again later " + JSON.stringify(data.errors));
        }
        
        const value = data?.value;
        return value as T;
    } catch(e: any) {
        throw new Error(`no response body ${e.message}`)
    }
}
