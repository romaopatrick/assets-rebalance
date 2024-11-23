import { Entity } from "./entity";
import { FinAssetBank } from "./fin-asset-bank";

export type FinAssetBankAccount  = Entity & {
    bank?: FinAssetBank; // required
    name?: string; // required
    tags?: string[]; // defaulted to an empty array
};