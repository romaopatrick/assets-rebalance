import zIndex from "@mui/material/styles/zIndex"

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

const taggedCategories = [
    FinAssetCategory.Fixed,
    FinAssetCategory.ExternalFixed,
]

export const isTaggedCategory = (fc : FinAssetCategory) => {
    return taggedCategories.includes(fc)
}
export const categories = Object.keys(FinAssetCategory).map((x: any) => finAssetCategoryDictionary[x as keyof typeof finAssetCategoryDictionary])