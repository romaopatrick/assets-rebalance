import { Expose } from "class-transformer";
import { Entity } from "./entity";

export type FinAssetBank =  Entity & {
  name?: string; // required
  routing?: string; // required
  ispb?: string | null; // optional
  ispbName?: string | null; // optional
  iconBase64?: string | null; // optional
}