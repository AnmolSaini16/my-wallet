import { TransactionTypeEnum } from '../../shared/enum/expense.enum';
export declare class CreateTransactionDto {
    type: TransactionTypeEnum;
    accountId: string;
    accountName: string;
    amount: number;
    tag: string;
    note: string;
    createdAt: string;
}
