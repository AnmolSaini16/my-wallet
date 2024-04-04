import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddAccountDto } from '../dto/addAccount.dto';
import { BankBalanceUpdateType } from 'src/shared/enum/common.enum';
import { EditAccountDto } from '../dto/editAccount.dto';

@Injectable()
export class AccountService {
  constructor(private prismaSerice: PrismaService) {}

  async addAccount(dto: AddAccountDto, userId: string) {
    //Check how many accounts user has already added
    const accounts = await this.getUserAccociatedBankAccounts(userId);

    //Dont allow to add more than 2 accounts
    //Todo - Add subsscription service
    if (accounts?.length === 2) {
      throw new BadRequestException('Cannot add more than 2 accounts');
    }

    // Else create account
    const account = await this.prismaSerice.account.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return account;
  }

  async editAccount(dto: EditAccountDto, userId: string) {
    const { id, ...restEditedData } = dto;

    return this.prismaSerice.account.update({
      where: { id, userId },
      data: {
        ...restEditedData,
      },
    });
  }

  async updateBalance(
    accountId: string,
    amount: number,
    bankBalanceUpdateType: BankBalanceUpdateType,
  ) {
    if (bankBalanceUpdateType === BankBalanceUpdateType.Decrement) {
      return this.prismaSerice.account.update({
        where: {
          id: accountId,
        },
        data: {
          balance: { decrement: amount },
        },
      });
    } else {
      //Increment
      return this.prismaSerice.account.update({
        where: {
          id: accountId,
        },
        data: {
          balance: { increment: amount },
        },
      });
    }
  }

  async getUserAccociatedBankAccounts(userId: string) {
    return this.prismaSerice.account.findMany({
      where: { userId },
    });
  }

  async getBankAccountFromAccountId(accountId: string) {
    return this.prismaSerice.account.findUnique({ where: { id: accountId } });
  }
}
