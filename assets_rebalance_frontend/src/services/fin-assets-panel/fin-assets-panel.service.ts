import { ChangeFinAssetsPanelInput } from "@/boundaries/change-fin-assets-panel.input"
import { FinAssetsPanel } from "@/domain/fin-assets-panel"
import { AppError, AppResult } from "@/domain/result"
import axios from "axios"
import { handleResponse } from "../common/response-handle"

export class FinAssetsPanelService {
    private get basePath() { return process.env.NEXT_PUBLIC_BASE_URL + '/FinAssetsPanel' }

    async change(input: ChangeFinAssetsPanelInput): Promise<FinAssetsPanel> {
        var response = await axios.put<AppResult<FinAssetsPanel> | any>(this.basePath, input)

        return handleResponse(response)
    }

    async all(activeOnly = false): Promise<FinAssetsPanel[]> {
        var response = await axios.get<FinAssetsPanel[] | AppError[]>(this.basePath + '/all', {
            params: {
                activeOnly
            }
        })

        return handleResponse(response)
    }

    async getById(id: string): Promise<FinAssetsPanel> {
        var response = await axios.get<FinAssetsPanel | AppError[]>(this.basePath + `/${id}`)
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

export const finAssetsPanelService = new FinAssetsPanelService()