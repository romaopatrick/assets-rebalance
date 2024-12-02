namespace assets_rebalance_backend.src.Domain.Enums;

public enum FinAssetCategory
{
    Fixed,
    Variable,
    Currency,
    Cripto,
    ExternalFixed,
    ExternalVariable
}

public static class FinAssetCategoryExtensions {
    public static bool UseTags(this FinAssetCategory category) {
        return category == FinAssetCategory.Fixed;
    }
}