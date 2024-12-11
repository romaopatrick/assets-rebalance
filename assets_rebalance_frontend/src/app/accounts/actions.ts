'use server';

import { handleResponse } from "../../lib/api/common/response-handle";
import { FinAssetBankAccount } from "@/lib/domain/fin-asset-bank-account";
import { revalidateTag } from "next/cache";
import { ChangeFinAssetBankAccountInput } from "./types";
import authfetch from "@/lib/api/common/auth-fetch";

const tag = 'accounts';
const basePath = process.env.API_URL + '/FinAssetBankAccount';

export async function changeBankAccount(input: ChangeFinAssetBankAccountInput): Promise<FinAssetBankAccount> {
    const response = await authfetch(basePath, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
    });

    revalidateTag(tag);

    return handleResponse(response);
}

export async function getAllBankAccounts(activeOnly = false): Promise<FinAssetBankAccount[]> {
    const url = `${basePath}/all?activeOnly=${activeOnly}`;
    const response = await authfetch(url, {
        method: "GET",
        next: {
            tags: [tag],
        },
    });

    return handleResponse(response);
}

export async function getBankAccountById(id: string): Promise<FinAssetBankAccount> {
    const url = `${basePath}/${id}`;
    const response = await authfetch(url, {
        method: "GET",
        next: {
            tags: [tag],
        },
    });

    return handleResponse(response);
}

export async function disableBankAccount(id: string): Promise<void> {
    const url = `${basePath}/d/${id}`;
    const response = await authfetch(url, {
        method: "PATCH",
    });

    revalidateTag(tag);

    return handleResponse(response);
}

export async function enableBankAccount(id: string): Promise<void> {
    const url = `${basePath}/e/${id}`;
    const response = await authfetch(url, {
        method: "PATCH",
    });

    revalidateTag(tag);

    return handleResponse(response);
}
