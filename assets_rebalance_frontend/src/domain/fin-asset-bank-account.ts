import { Entity } from "./entity";
import { FinAssetBank } from "./fin-asset-bank";

export class FinAssetBankAccount extends Entity {
    bank: FinAssetBank = new FinAssetBank(); // required
    name: string = ''; // required
    tags: string[] = []; // defaulted to an empty array
};