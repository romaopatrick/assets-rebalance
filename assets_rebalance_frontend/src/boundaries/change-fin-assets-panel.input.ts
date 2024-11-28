import { FinAssetsGroup } from "@/domain/fin-assets-group";
import { FinAssetsPanel } from "@/domain/fin-assets-panel";

export class ChangeFinAssetsPanelInput {
    id: string; // Required (UUID represented as a string in TypeScript)
    amountToInvest: number = 0; // Default to 0
    children: FinAssetsGroup[] = []; // Default to an empty array
    name: string; // Required

    constructor(name: string, amountToInvest: number = 0, children: FinAssetsGroup[] = [], id: string) {
        this.id = id
        this.amountToInvest = amountToInvest;
        this.children = children;
        this.name = name;
    }

    public static fromDomain(p: FinAssetsPanel): ChangeFinAssetsPanelInput {
        const input = new ChangeFinAssetsPanelInput(
            p.name, p.amountToInvest, p.children, p.id!,
        )
        input.id

        return input
    }
}
