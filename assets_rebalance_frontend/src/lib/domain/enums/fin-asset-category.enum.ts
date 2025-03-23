export enum FinAssetCategory {
    Fixed,
    Variable,
    Currency,
    Cripto,
    ExternalFixed,
    ExternalVariable
}


export const finAssetCategoryDictionary: {[id: number]: string} = {
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

export const categories_keys = Object.keys(finAssetCategoryDictionary)
export const categories = Object.values(finAssetCategoryDictionary)