import { TransactionService } from '../service/transaction.service';
import { CreateTransactionDto } from '../dto/createTransaction';
import { EditTransactionDto } from '../dto/editTransaction.dto';
import { DeleteTransactionDto } from '../dto/deleteTransaction.dto';
import { TransactionSearchQuery } from '../query/transactionsSearchQuery';
import { UserDto } from '../../shared/dto/user.dto';
export declare class TransactionController {
    private transactionService;
    constructor(transactionService: TransactionService);
    createTransaction(dto: CreateTransactionDto, user: UserDto): Promise<{
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
    editTransaction(dto: EditTransactionDto, user: UserDto): Promise<{
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
    getTransactions(params: TransactionSearchQuery, user: UserDto): Promise<{
        id: string;
        userId: string;
        accountId: string;
        accountName: string;
        type: string;
        amount: number;
        tag: string;
        note: string;
        createdAt: string;
    }[]>;
}
