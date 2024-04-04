import { CreateTransactionDto } from '../dto/createTransaction';
import { EditTransactionDto } from '../dto/editTransaction.dto';
import { DeleteTransactionDto } from '../dto/deleteTransaction.dto';
import { TransactionSearchQuery } from '../query/transactionsSearchQuery';
import { AccountService } from '../../account/service/account.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Transaction } from '@prisma/client';
export declare class TransactionService {
    private prismaSerice;
    private accountService;
    constructor(prismaSerice: PrismaService, accountService: AccountService);
    createTransaction(dto: CreateTransactionDto, userId: string): Promise<Transaction>;
    editTransaction(dto: EditTransactionDto, userId: string): Promise<{
        id: string;
        userId: string;
        accountId: string;
        accountName: string;
        type: string;
        amount: number;
        tag: string;
        note: string;
        createdAt: string;
    }>;
    deleteTransaction(dto: DeleteTransactionDto): Promise<void>;
    getTransactions(params: TransactionSearchQuery, userId: string): Promise<Transaction[]>;
}
