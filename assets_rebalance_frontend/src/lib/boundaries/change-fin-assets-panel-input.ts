import { FinAssetsGroup } from "@/lib/domain/fin-assets-group";
import { FinAssetsPanel } from "@/lib/domain/fin-assets-panel";

export type ChangeFinAssetsPanelInput = {
    id: string; // Required (UUID represented as a string in TypeScript)
    amountToInvest: number; // Default to 0
    children: FinAssetsGroup[] // Default to an empty array
    name: string; // Required
}

export class ChangeFinAssetsPanelInputManager {
    public static fromDomain(p: FinAssetsPanel): ChangeFinAssetsPanelInput {
        const input: ChangeFinAssetsPanelInput = {
            amountToInvest: p.amountToInvest,
            children: p.children,
            id: p.id!,
            name: p.name,
        }

        return input
    }
}
