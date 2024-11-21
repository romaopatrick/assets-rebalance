import { FinAssetsGroup } from "@/domain/fin-assets-group";
import { FinAssetsPanel } from "@/domain/fin-assets-panel";

export class ChangeFinAssetsPanelInput {
    id: string; // Required (UUID represented as a string in TypeScript)
    amountToInvest: number = 0; // Default to 0
    children: FinAssetsGroup[] = []; // Default to an empty array
    name: string; // Required

    constructor(name: string, amountToInvest: number = 0, children: FinAssetsGroup[] = []) {
        this.id = crypto.randomUUID(); // Generates a new UUID if not provided (similar to Guid.NewGuid())
        this.amountToInvest = amountToInvest;
        this.children = children;
        this.name = name;
    }

    toDomain(): FinAssetsPanel {
        const panel = new FinAssetsPanel(
            this.name, this.amountToInvest, this.children);
            
        panel.id = this.id;
        return panel;
    }
}
