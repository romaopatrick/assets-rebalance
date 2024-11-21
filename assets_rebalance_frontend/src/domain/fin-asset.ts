import { FinAssetCategory } from "./enums/fin-asset-category.enum";
import { FixedIncomeIndexer } from "./enums/fixed-income-indexer.enum";
import { FinAssetsGroup } from "./fin-assets-group";
export class FinAssetExternalVariableIncomeData {
    dolarPrice: number; // required

    constructor(dolarPrice: number) {
        this.dolarPrice = dolarPrice;
    }
}

class FinAssetFixedIncomeData {
    indexer: FixedIncomeIndexer; // required
    indexerPercent: number; // required
    expirationDate: Date; // required
    applicationAmount: number; // required
    grossValue: number; // required
    netValue: number; // required

    constructor(
        indexer: FixedIncomeIndexer,
        indexerPercent: number,
        expirationDate: Date,
        applicationAmount: number,
        grossValue: number,
        netValue: number
    ) {
        this.indexer = indexer;
        this.indexerPercent = indexerPercent;
        this.expirationDate = expirationDate;
        this.applicationAmount = applicationAmount;
        this.grossValue = grossValue;
        this.netValue = netValue;
    }

    get taxesValue(): number {
        return this.grossValue - this.netValue;
    }

    get taxesPercentage(): number {
        return (this.taxesValue * 100) / this.grossValue;
    }

    get currentNetBalance(): number {
        return this.netValue - this.applicationAmount;
    }

    get currentNetBalancePercent(): number {
        return (this.currentNetBalance * 100) / this.applicationAmount;
    }

    get currentGrossBalance(): number {
        return this.grossValue - this.applicationAmount;
    }

    get currentGrossBalancePercent(): number {
        return (this.currentGrossBalance * 100) / this.applicationAmount;
    }
}

export class FinAsset {
    name: string; // required
    tag?: string | null; // optional
    score: number = 1; // required with a default value
    currentAmount: number; // required
    accountId: string; // required (UUIDs are represented as strings in TypeScript)
    currentQuantity?: number | null; // optional
    category: FinAssetCategory; // required
    variableIncomeData?: FinAssetExternalVariableIncomeData | null; // optional
    fixedIncomeData?: FinAssetFixedIncomeData | null; // optional

    constructor(
        name: string,
        score: number,
        currentAmount: number,
        accountId: string,
        category: FinAssetCategory,
        tag?: string | null,
        currentQuantity?: number | null,
        variableIncomeData?: FinAssetExternalVariableIncomeData | null,
        fixedIncomeData?: FinAssetFixedIncomeData | null
    ) {
        this.name = name;
        this.tag = tag ?? null;
        this.score = score;
        this.currentAmount = currentAmount;
        this.accountId = accountId;
        this.currentQuantity = currentQuantity ?? null;
        this.category = category;
        this.variableIncomeData = variableIncomeData ?? null;
        this.fixedIncomeData = fixedIncomeData ?? null;
    }

    get scorePercent(): number {
        return this.score / 100;
    }

    recommendedAmount(parentGroup: FinAssetsGroup, totalAmount: number): number {
        return totalAmount * parentGroup.scorePercent * this.scorePercent;
    }

    adjustAmount(parentGroup: FinAssetsGroup, totalAmount: number): number {
        return this.recommendedAmount(parentGroup, totalAmount) - this.currentAmount;
    }
}
