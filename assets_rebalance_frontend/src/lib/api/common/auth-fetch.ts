import { cookies } from "next/headers";

type FetchWrapperOptions = RequestInit & {
    headers?: Record<string, string>;
};

export default async function authfetch(url: string, options: FetchWrapperOptions = {}): Promise<Response> {
    const apiKey = cookies?.()?.get("apiKey")?.value ?? ''
    if (!apiKey)
        throw new Error("API KEY is required")


    const headers = {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'x-api-key': apiKey,
        ...options.headers,
    };

    
    const fetchOptions: RequestInit = {
        ...options,
        headers,
        next: {
            revalidate: 3600,
            tags: [...(options.next?.tags ?? []), "all"],
            ...options.next,
        }
    };
    
    console.log("request", url, fetchOptions)
    return await fetch(url, fetchOptions); // Return the fetch result
}