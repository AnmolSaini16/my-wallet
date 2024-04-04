import { AddAccountDto } from '../dto/addAccount.dto';
import { EditAccountDto } from '../dto/editAccount.dto';
import { BankBalanceUpdateType } from '../../shared/enum/common.enum';
import { PrismaService } from '../../prisma/prisma.service';
export declare class AccountService {
    private prismaSerice;
    constructor(prismaSerice: PrismaService);
    addAccount(dto: AddAccountDto, userId: string): Promise<{
        id: string;
        userId: string;
        account: string;
        balance: number;
        group: string;
        createdAt: Date;
    }>;
    editAccount(dto: EditAccountDto, userId: string): Promise<{
        id: string;
        userId: string;
        account: string;
        balance: number;
        group: string;
        createdAt: Date;
    }>;
    updateBalance(accountId: string, amount: number, bankBalanceUpdateType: BankBalanceUpdateType): Promise<{
        id: string;
        userId: string;
        account: string;
        balance: number;
        group: string;
        createdAt: Date;
    }>;
    getUserAccociatedBankAccounts(userId: string): Promise<{
        id: string;
        userId: string;
        account: string;
        balance: number;
        group: string;
        createdAt: Date;
    }[]>;
    getBankAccountFromAccountId(accountId: string): Promise<{
        id: string;
        userId: string;
        account: string;
        balance: number;
        group: string;
        createdAt: Date;
    }>;
}
