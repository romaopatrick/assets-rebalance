import { Result } from "typescript-result";
import { FinAssetCategory } from "./enums/fin-asset-category.enum";
import { FinAsset } from "./fin-asset";

export class FinAssetsGroup {
    name: string; // required
    score: number; // required
    children: FinAsset[] = []; // initialized to an empty array
    category: FinAssetCategory; // required

    constructor(
        name: string,
        score: number,
        category: FinAssetCategory,
        children: FinAsset[] = []
    ) {
        this.name = name;
        this.score = score;
        this.category = category;
        this.children = children;
    }

    get currentAmount(): number {
        return this.children.reduce((sum, asset) => sum + asset.currentAmount, 0);
    }

    get scorePercent(): number {
        return this.score / 100;
    }

    validate() {
        const scoreSum = this.children
            .reduce((groups, asset) => {
                const key = `${asset.tag}-${asset.score}`;
                groups[key] = (groups[key] || 0) + asset.score;
                return groups;
            }, {} as Record<string, number>);

        const totalScore = Object.values(scoreSum).reduce((sum, value) => sum + value, 0);

        if (totalScore !== 100) {
            return Result.error('Group children score must sum to 100.');
        }

        return Result.ok();
    }
}
