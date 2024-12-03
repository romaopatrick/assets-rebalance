import { ChangeFinAssetsPanelInput } from "@/lib/boundaries/change-fin-assets-panel.input"
import axios from "axios"
import { handleResponse } from "../common/response-handle"
import { FinAssetsPanel } from "@/lib/domain/fin-assets-panel"
import { AppResult, AppError } from "@/lib/domain/result"

export class FinAssetsPanelService {
    private get basePath() { return process.env.NEXT_PUBLIC_BASE_URL + '/FinAssetsPanel' }

    async change(input: ChangeFinAssetsPanelInput): Promise<FinAssetsPanel> {
        const response = await axios.put<AppResult<FinAssetsPanel> | AppError[]>(this.basePath, input)

        return handleResponse(response)
    }

    async all(activeOnly = false): Promise<FinAssetsPanel[]> {
        const response = await axios.get<FinAssetsPanel[] | AppError[]>(this.basePath + '/all', {
            params: {
                activeOnly
            }
        })

        return handleResponse(response)
    }

    async getById(id: string): Promise<FinAssetsPanel> {
        const response = await axios.get<FinAssetsPanel | AppError[]>(this.basePath + `/${id}`)

        return handleResponse(response)
    }

    async disable(id: string): Promise<void> {
        const response = await axios.patch<void | AppError[]>(this.basePath + `/d/${id}`)

        return handleResponse(response)
    }

    async enable(id: string): Promise<void> {
        const response = await axios.patch<void | AppError[]>(this.basePath + `/e/${id}`)

        return handleResponse(response)
    }
}

export const finAssetsPanelService = new FinAssetsPanelService()