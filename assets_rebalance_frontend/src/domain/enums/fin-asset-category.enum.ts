export enum FinAssetCategory {
    Fixed,
    Variable,
    Currency,
    Cripto,
    ExternalFixed,
    ExternalVariable
}

export const finAssetCategoryDictionary = {
    [FinAssetCategory.Fixed]: "Fixed",
    [FinAssetCategory.Variable]: "Variable",
    [FinAssetCategory.Currency]: "Currency",
    [FinAssetCategory.Cripto]: "Cripto",
    [FinAssetCategory.ExternalFixed]: "Ext. Fixed",
    [FinAssetCategory.ExternalVariable]: "Ext. Variable",
}