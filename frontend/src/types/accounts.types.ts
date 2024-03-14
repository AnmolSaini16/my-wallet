import { BankGroupEnum } from "@/constants/enum/account.enum";

export interface Account {
  id: string;
  userId: string;
  createdAt: string;
  account: string;
  balance: number;
  group: BankGroupEnum;
}
