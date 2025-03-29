import { Entity } from "./entity";
import { FinAssetCategory } from "./enums/fin-asset-category.enum";
import { FinAssetStatus } from "./enums/fin-asset-status.enum";
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
export function getIndexerTotalPercentage(t: Partial<FinAssetFixedIncomeData>, cdi: number, ipca: number): number {
    return indexer_handler?.[t.indexer ?? FixedIncomeIndexer.FIXED]?.(t.indexerPercent ?? 0, cdi, ipca)
}
const indexer_handler: { [indexer: number]: (idx_percent: number, cdi: number, ipca: number) => number } = {
    [FixedIncomeIndexer.CDI]: (idx_percent, cdi) => (idx_percent / 100) * cdi,
    [FixedIncomeIndexer.IPCA]: (idx_percent, _, ipca) => ipca + idx_percent,
    [FixedIncomeIndexer.FIXED]: (idx_percent) => idx_percent
}

export type FinAsset = Entity & {
    name: string;
    tag?: string | null;
    score: number;
    status: FinAssetStatus;
    currentAmount: number;
    accountId: string;
    currentQuantity?: number;
    category: FinAssetCategory;
    variableIncomeData?: FinAssetExternalVariableIncomeData | null;
    fixedIncomeData?: Partial<FinAssetFixedIncomeData> | null;

    scorePercent?: number

    recommendedAmount?: number

    adjustAmount?: number
    buyAdjustAmount?: number
}
