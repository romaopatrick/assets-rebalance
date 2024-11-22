import { ChangeFinAssetBankInput } from "@/boundaries/change-fin-asset-bank.input";
import { AppError, AppResult } from "@/domain/result";
import { FinAssetBank } from "@/domain/fin-asset-bank";
import axios, { HttpStatusCode } from "axios";
import { config } from "process";
import { Result } from "typescript-result";
import { handleResponse } from "../common/response-handle";

export class FinAssetsBankService {
    async change(input: ChangeFinAssetBankInput): Promise<FinAssetBank> {
        var response = await axios.put<AppResult<FinAssetBank> | any>(process.env.NEXT_PUBLIC_BASE_URL + '/FinAssetBank', input)

        return handleResponse(response)
    }

    async all(activeOnly = false): Promise<FinAssetBank[]> {
        var response = await axios.get<FinAssetBank[] | AppError[]>(process.env.NEXT_PUBLIC_BASE_URL + '/FinAssetBank/all', {
            params: {
                activeOnly
            }
        })

        return handleResponse(response)
    }

    async disable(id: string): Promise<void> {
        var response = await axios.patch<void | AppError[]>(process.env.NEXT_PUBLIC_BASE_URL + `/FinAssetBank/d/${id}`)

        return handleResponse(response)
    }
    
    async enable(id: string): Promise<void> {
        var response = await axios.patch<void | AppError[]>(process.env.NEXT_PUBLIC_BASE_URL + `/FinAssetBank/e/${id}`)

        return handleResponse(response)
    }
}

export const finAssetsBankService = new FinAssetsBankService()