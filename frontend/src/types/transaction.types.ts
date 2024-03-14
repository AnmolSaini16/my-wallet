import {
  TransactionTypeEnum,
  TransactionTagEnum,
} from "@/constants/enum/transaction.enum";

export interface Transaction {
  id: string;
  userId: string;
  accountId: string;
  accountName: string;
  type: TransactionTypeEnum;
  amount: number;
  tag: TransactionTagEnum;
  note: string | null;
  createdAt: string;
}

export interface CreateTransaction extends Omit<Transaction, "id" | "userId"> {}
export interface EditTransacton extends Omit<Transaction, "userId"> {}
