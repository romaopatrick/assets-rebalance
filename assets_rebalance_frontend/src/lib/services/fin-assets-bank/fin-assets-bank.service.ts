import { ChangeFinAssetBankInput } from "@/lib/boundaries/change-fin-asset-bank.input";
import { handleResponse } from "../common/response-handle";
import { FinAssetBank } from "@/lib/domain/fin-asset-bank";
import { AppResult, AppError } from "@/lib/domain/result";
import { revalidateTag } from "next/cache";

export class FinAssetsBankService {
    private get basePath() {
        return process.env.NEXT_PUBLIC_BASE_URL + '/FinAssetBank';
    }

    async change(input: ChangeFinAssetBankInput): Promise<FinAssetBank> {
        const response = await fetch(this.basePath, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
        });

        revalidateTag('banks-list')

        return await handleResponse<FinAssetBank>(response);
    }

    async all(activeOnly = false): Promise<FinAssetBank[]> {
        const url = new URL(this.basePath + '/all');
        url.searchParams.append('activeOnly', String(!!activeOnly));

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: { 'Cache-Control': 'no-cache' },
            next: {
                tags: ['banks-list']
            }
        });

        return await handleResponse<FinAssetBank[]>(response);
    }

    async getById(id: string): Promise<FinAssetBank> {
        const response = await fetch(this.basePath + `/${id}`, {
            method: 'GET',
        });

        return await handleResponse<FinAssetBank>(response);
    }

    async disable(id: string): Promise<void> {
        const response = await fetch(this.basePath + `/d/${id}`, {
            method: 'PATCH',
        });

        return await handleResponse<void>(response);
    }

    async enable(id: string): Promise<void> {
        const response = await fetch(this.basePath + `/e/${id}`, {
            method: 'PATCH',
        });

        return await handleResponse<void>(response);
    }
}

export const finAssetsBankService = new FinAssetsBankService();
