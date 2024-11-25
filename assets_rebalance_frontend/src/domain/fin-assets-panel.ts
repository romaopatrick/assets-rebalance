import { FinAssetsGroup, finAssetsGroupManager } from './fin-assets-group';
import { Entity } from './entity';
import { Result } from 'typescript-result';
import { AppError, AppResult } from './result';

export type FinAssetsPanel = Entity & {
  children: FinAssetsGroup[]; // Initialized to an empty array
  name: string; // Required
  amountToInvest: number;
  investedAmount: number
  totalAmount: number
  totalScore: number // Required with default value
}

export function finAssetsPanelManager(panel: FinAssetsPanel) {
  return {

    validate(): Result<void, string[]> {
      const errors: string[] = [];

      if (panel.totalScore !== 100) {
        errors.push("Panel children must sum to 100.");
      }

      for (const child of panel.children) {
        const childValidation = finAssetsGroupManager(child).validate();
        if (childValidation.isError()) {
          errors.push(childValidation.error);
        }
      }

      return errors.length > 0 ? Result.error(errors) : Result.ok(undefined);
    },

    allAccountIds(): string[] {
      return panel.children.flatMap(group =>
        group.children.map(asset => asset.accountId)
      );
    }
  }
}
