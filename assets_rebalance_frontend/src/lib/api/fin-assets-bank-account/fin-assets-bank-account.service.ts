'use server';

import { handleResponse } from "../common/response-handle";
import { ChangeFinAssetBankAccountInput } from "@/lib/boundaries/change-fin-asset-bank-account.input";
import { FinAssetBankAccount } from "@/lib/domain/fin-asset-bank-account";
import { revalidateTag } from "next/cache";

const tag = 'accounts';
const basePath = process.env.NEXT_PUBLIC_BASE_URL + '/FinAssetBankAccount';

export async function changeBankAccount(input: ChangeFinAssetBankAccountInput): Promise<FinAssetBankAccount> {
    const response = await fetch(basePath, {
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
    const response = await fetch(url, {
        method: "GET",
        next: {
            tags: [tag],
        },
    });

    return handleResponse(response);
}

export async function getBankAccountById(id: string): Promise<FinAssetBankAccount> {
    const url = `${basePath}/${id}`;
    const response = await fetch(url, {
        method: "GET",
        next: {
            tags: [tag],
        },
    });

    return handleResponse(response);
}

export async function disableBankAccount(id: string): Promise<void> {
    const url = `${basePath}/d/${id}`;
    const response = await fetch(url, {
        method: "PATCH",
    });

    revalidateTag(tag);

    return handleResponse(response);
}

export async function enableBankAccount(id: string): Promise<void> {
    const url = `${basePath}/e/${id}`;
    const response = await fetch(url, {
        method: "PATCH",
    });

    revalidateTag(tag);

    return handleResponse(response);
}
