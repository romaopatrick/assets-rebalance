import { ChangeFinAssetBankInput } from "@/boundaries/change-fin-asset-bank.input";
import { AppError } from "@/domain/app-error";
import { FinAssetBank } from "@/domain/fin-asset-bank";
import axios, { HttpStatusCode } from "axios";
import { config } from "process";
import { Result } from "typescript-result";

export class FinAssetsBankService {
    async change(input: ChangeFinAssetBankInput): Promise<Result<FinAssetBank, AppError[]>> {
        var response = await axios.put(process.env.NEXT_PUBLIC_BASE_URL + '/api/FinAssetBank', input)

        if (response.status >= 200 && response.status <= 299)
            return Result.ok<FinAssetBank>(response.data)

        return Result.error<AppError[]>(response.data)
    }

    async all(activeOnly = false): Promise<Result<FinAssetBank[], AppError[]>> {
        var response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/api/FinAssetBank/all', {
            params: {
                activeOnly
            }
        })

        if (response.status >= 200 && response.status <= 299)
            return Result.ok<FinAssetBank[]>(response.data)

        return Result.error<AppError[]>(response.data)
    }
}

export const finAssetsBankService = new FinAssetsBankService()