import axios from "axios"
import { handleResponse } from "../common/response-handle"
import { ChangeFinAssetBankAccountInput } from "@/lib/boundaries/change-fin-asset-bank-account.input"
import { FinAssetBankAccount } from "@/lib/domain/fin-asset-bank-account"
import { AppResult, AppError } from "@/lib/domain/result"

export class FinAssetsBankAccountService {
    private get basePath() { return process.env.NEXT_PUBLIC_BASE_URL + '/FinAssetBankAccount' }

    async change(input: ChangeFinAssetBankAccountInput): Promise<FinAssetBankAccount> {
        var response = await axios.put<AppResult<FinAssetBankAccount> | any>(this.basePath, input)

        return handleResponse(response)    
    }

    async all(activeOnly = false): Promise<FinAssetBankAccount[]> {
        var response = await axios.get<FinAssetBankAccount[] | AppError[]>(this.basePath + '/all', {
            params: {
                activeOnly
            }
        })

        return handleResponse(response)    
    }

    async getById(id: string): Promise<FinAssetBankAccount> {
        var response = await axios.get<FinAssetBankAccount | AppError[]>(this.basePath + `/${id}`)
        console.log("called", response.data)

        return handleResponse(response)    
    }

    async disable(id: string): Promise<void> {
        var response = await axios.patch<void | AppError[]>(this.basePath + `/d/${id}`)

        return handleResponse(response)    
    }

    async enable(id: string): Promise<void> {
        var response = await axios.patch<void | AppError[]>(this.basePath + `/e/${id}`)

        return handleResponse(response)    
    }
}

export const finAssetsBankAccountService = new FinAssetsBankAccountService()