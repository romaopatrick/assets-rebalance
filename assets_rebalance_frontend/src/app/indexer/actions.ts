'use server';

import { handleResponse } from "../../lib/api/common/response-handle";
import authfetch from "@/lib/api/common/auth-fetch";
import { revalidateTag } from "next/cache";

// Define cache tags
const ipcaTag = 'ipca';
const cdiTag = 'cdi';

const basePath = process.env.API_URL + '/Indexer';

export async function IPCAYearAverage(): Promise<number | null> {
    const url = `${basePath}/ipca`;
    const response = await authfetch(url, {
        method: "GET",
        next: {
            tags: [ipcaTag],
            revalidate: 86400
        },
    });

    return handleResponse(response); 
}

export async function CDIYearAverage(): Promise<number | null> {
    const url = `${basePath}/cdi`;
    const response = await authfetch(url, {
        method: "GET",
        next: {
            tags: [cdiTag],
            revalidate: 86400
        },
    });

    return handleResponse(response); 
}
