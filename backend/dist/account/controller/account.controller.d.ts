import { AddAccountDto } from '../dto/addAccount.dto';
import { AccountService } from '../service/account.service';
import { EditAccountDto } from '../dto/editAccount.dto';
import { UserDto } from '../../shared/dto/user.dto';
export declare class AccountController {
    private accountService;
    constructor(accountService: AccountService);
    addAccount(dto: AddAccountDto, user: UserDto): Promise<{
        id: string;
        userId: string;
        account: string;
        balance: number;
        group: string;
        createdAt: Date;
    }>;
    editAccount(dto: EditAccountDto, user: UserDto): Promise<{
        id: string;
        userId: string;
        account: string;
        balance: number;
        group: string;
        createdAt: Date;
    }>;
    getAccounts(user: UserDto): Promise<{
        id: string;
        userId: string;
        account: string;
        balance: number;
        group: string;
        createdAt: Date;
    }[]>;
}
