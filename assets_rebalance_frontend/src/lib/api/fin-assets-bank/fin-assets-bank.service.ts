'use server';

import { ChangeFinAssetBankInput } from "@/lib/boundaries/change-fin-asset-bank.input";
import { handleResponse } from "../common/response-handle";
import { FinAssetBank } from "@/lib/domain/fin-asset-bank";
import { revalidateTag } from "next/cache";

const tag = 'banks';
const basePath = process.env.NEXT_PUBLIC_BASE_URL + '/FinAssetBank';

export async function changeBank(input: ChangeFinAssetBankInput): Promise<FinAssetBank> {
    const response = await fetch(basePath, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
    });

    revalidateTag(tag);

    return handleResponse<FinAssetBank>(response);
}

export async function getAllBanks(activeOnly = false): Promise<FinAssetBank[]> {
    const url = new URL(`${basePath}/all`);
    url.searchParams.append('activeOnly', String(!!activeOnly));

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: { 'Cache-Control': 'no-cache' },
        next: {
            tags: [tag],
        },
    });

    return handleResponse<FinAssetBank[]>(response);
}

export async function getBankById(id: string): Promise<FinAssetBank> {
    const response = await fetch(`${basePath}/${id}`, {
        method: 'GET',
        next: {
            tags: [tag],
        },
    });

    return handleResponse<FinAssetBank>(response);
}

export async function disableBank(id: string): Promise<void> {
    const response = await fetch(`${basePath}/d/${id}`, {
        method: 'PATCH',
    });

    revalidateTag(tag);

    return handleResponse<void>(response);
}

export async function enableBank(id: string): Promise<void> {
    const response = await fetch(`${basePath}/e/${id}`, {
        method: 'PATCH',
    });

    revalidateTag(tag);

    return handleResponse<void>(response);
}