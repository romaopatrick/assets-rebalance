import { Entity } from "./entity";

export class FinAssetBank extends Entity {
  name: string = ''; // required
  routing: string = ''; // required
  ispb?: string | null; // optional
  ispbName?: string | null; // optional
  iconBase64?: string | null; // optional
}