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
        const bank = new FinAssetBank(); // Initialize without parameters
        bank.id = this.id!;
        bank.name = this.name;
        bank.routing = this.routing;
        bank.ispb = this.ispb;
        bank.ispbName = this.ispbName;
        bank.iconBase64 = this.iconBase64;

        return bank;
    }
}
