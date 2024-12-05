import { FinAssetBank } from "@/lib/domain/fin-asset-bank";
import { FinAssetBankAccount } from "@/lib/domain/fin-asset-bank-account";

export class ChangeFinAssetBankAccountInput {
  id?: string
  bankId: string; // Required (UUID is represented as a string in TypeScript)
  name: string; // Required
  tags: string[] = []; // Default to an empty array

  constructor(bankId: string, name: string, tags: string[] = [], id?: string) {
    this.bankId = bankId;
    this.name = name;
    this.id = id
    this.tags = tags;
  }

  toDomain(bank: FinAssetBank): FinAssetBankAccount {
    return {
      id: this.id,
      bank: bank,
      name: this.name,
      tags: this.tags,
    };
  }
}
