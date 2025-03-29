export enum FixedIncomeIndexer {
    CDI,
    IPCA,
    FIXED
}

export const fixedIncomeIndexerDict: {[id: number]: string} = {
    [FixedIncomeIndexer.CDI]: "CDI",
    [FixedIncomeIndexer.IPCA]: "IPCA+",
    [FixedIncomeIndexer.FIXED]: "FIXED",
}