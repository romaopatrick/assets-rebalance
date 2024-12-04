import { FinAssetCategory } from "./enums/fin-asset-category.enum";
import { FixedIncomeIndexer } from "./enums/fixed-income-indexer.enum";

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

export type FinAsset = {
    name: string; // required
    tag?: string | null; // optional
    score: number; // required with a default value
    currentAmount: number; // required
    accountId: string; // required (UUIDs are represented as strings in TypeScript)
    currentQuantity?: number | null; // optional
    category: FinAssetCategory; // required
    variableIncomeData?: FinAssetExternalVariableIncomeData | null; // optional
    fixedIncomeData?: FinAssetFixedIncomeData | null; // optional

    scorePercent?: number

    recommendedAmount?: number

    adjustAmount?: number
}
