import { Result } from "typescript-result";
import { FinAssetCategory } from "./enums/fin-asset-category.enum";
import { FinAsset } from "./fin-asset";

export type FinAssetsGroup = {
    name: string; // required
    score: number; // required
    children: FinAsset[]; // initialized to an empty array
    category: FinAssetCategory;
    currentAmount: number
    recommendedAmount: number
    adjustAmount: number
    scorePercent: number
}

export function finAssetsGroupManager(group: FinAssetsGroup) {
    return {
        validate() {
            const scoreSum = group.children
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
}
