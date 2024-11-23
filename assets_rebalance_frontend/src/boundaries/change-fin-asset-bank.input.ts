import { FinAssetBank } from "@/domain/fin-asset-bank";

export class ChangeFinAssetBankInput {
    id?: string; // Required (UUID is represented as a string in TypeScript)
    name: string; // Required
    routing: string; // Required
    ispb?: string | null; // Optional
    ispbName?: string | null; // Optional
    iconBase64?: string | null; // Optional

    constructor(
        name: string,
        routing: string,
        id?: string,
        ispb?: string | null,
        ispbName?: string | null,
        iconBase64?: string | null
    ) {
        this.id = id
        this.name = name;
        this.routing = routing;
        this.ispb = ispb ?? null;
        this.ispbName = ispbName ?? null;
        this.iconBase64 = iconBase64 ?? null;
    }

    toDomain(): FinAssetBank {
        return {
            id: this.id,
            name: this.name,
            routing: this.routing,
            ispb: this.ispb,
            ispbName: this.ispbName,
            iconBase64: this.iconBase64,
        };
    }
}
