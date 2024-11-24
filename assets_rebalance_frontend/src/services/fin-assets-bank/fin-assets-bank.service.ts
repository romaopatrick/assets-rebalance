import { ChangeFinAssetBankInput } from "@/boundaries/change-fin-asset-bank.input";
import { AppError, AppResult } from "@/domain/result";
import { FinAssetBank } from "@/domain/fin-asset-bank";
import axios from "axios";
import { handleResponse } from "../common/response-handle";

export class FinAssetsBankService {
    private get basePath() { return process.env.NEXT_PUBLIC_BASE_URL + '/FinAssetBank' }
    async change(input: ChangeFinAssetBankInput): Promise<FinAssetBank> {
        var response = await axios.put<AppResult<FinAssetBank> | any>(this.basePath, input)

        return handleResponse(response)
    }

    async all(activeOnly = false): Promise<FinAssetBank[]> {
        var response = await axios.get<FinAssetBank[] | AppError[]>(this.basePath + '/all', {
            params: {
                activeOnly
            }
        })


        return handleResponse(response)
    }

    async getById(id: string): Promise<FinAssetBank> {
        var response = await axios.get<FinAssetBank | AppError[]>(this.basePath + `/${id}`)

        return handleResponse(response)    }

    async disable(id: string): Promise<void> {
        var response = await axios.patch<void | AppError[]>(this.basePath + `/d/${id}`)

        return handleResponse(response)    
    }

    async enable(id: string): Promise<void> {
        var response = await axios.patch<void | AppError[]>(this.basePath + `/e/${id}`)

        return handleResponse(response)    
    }
}

export const finAssetsBankService = new FinAssetsBankService()