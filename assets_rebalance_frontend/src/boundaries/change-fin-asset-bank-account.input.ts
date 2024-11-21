import { FinAssetBank } from "@/domain/fin-asset-bank";
import { FinAssetBankAccount } from "@/domain/fin-asset-bank-account";

export class ChangeFinAssetBankAccountInput {
    bankId: string; // Required (UUID is represented as a string in TypeScript)
    name: string; // Required
    tags: string[] = []; // Default to an empty array
  
    constructor(bankId: string, name: string, tags: string[] = []) {
      this.bankId = bankId;
      this.name = name;
      this.tags = tags;
    }
  
    toDomain(bank: FinAssetBank): FinAssetBankAccount {
      const bankAccount = new FinAssetBankAccount(); // Initialize without parameters
      bankAccount.bank = bank;
      bankAccount.name = this.name;
      bankAccount.tags = this.tags;
      return bankAccount;
    }
  }
  