import { Result } from 'typescript-result';
import { FinAssetsGroup } from './fin-assets-group';
import { Entity } from './entity';

export class FinAssetsPanel extends Entity {
  children: FinAssetsGroup[] = []; // Initialized to an empty array
  name: string; // Required
  amountToInvest: number = 0; // Required with default value

  constructor(name: string, amountToInvest: number, children: FinAssetsGroup[] = []) {
    super()

    this.name = name;
    this.amountToInvest = amountToInvest;
    this.children = children;
  }

  get investedAmount(): number {
    return this.children.reduce((sum, group) => sum + group.currentAmount, 0);
  }

  get totalAmount(): number {
    return this.investedAmount + this.amountToInvest;
  }

  get totalScore(): number {
    return this.children.reduce((sum, group) => sum + group.score, 0);
  }

  validate(): Result<void, string[]> {
    const errors: string[] = [];

    if (this.totalScore !== 100) {
      errors.push("Panel children must sum to 100.");
    }

    for (const child of this.children) {
      const childValidation = child.validate();
      if (childValidation.isError()) {
        errors.push(...childValidation.error);
      }
    }

    return errors.length > 0 ? Result.error(errors) : Result.ok(undefined);
  }

  allAccountIds(): string[] {
    return this.children.flatMap(group =>
      group.children.map(asset => asset.accountId)
    );
  }
}
