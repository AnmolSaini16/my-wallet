import { Injectable, BadRequestException } from '@nestjs/common';
import { AddAccountDto } from '../dto/addAccount.dto';
import { EditAccountDto } from '../dto/editAccount.dto';
import { BankBalanceUpdateType } from '../../shared/enum/common.enum';
import { PrismaService } from '../../prisma/prisma.service';
import { DeleteAccountDTO } from '../dto/deleteAccount.dto';

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

    //find previous account and check if names is changed
    const account = await this.getBankAccountFromAccountId(dto.id);

    //if name is changed update all transactions if new name
    if (account.account !== dto.account) {
      await this.prismaSerice.transaction.updateMany({
        where: { accountId: dto.id },
        data: {
          accountName: dto.account,
        },
      });
    }

    return this.prismaSerice.account.update({
      where: { id, userId },
      data: {
        ...restEditedData,
      },
    });
  }

  async deleteAccount(dto: DeleteAccountDTO, userId: string) {
    const userAccounts = await this.getUserAccociatedBankAccounts(userId);
    if (userAccounts.length === 1) {
      throw new BadRequestException(
        'At least one account must remain active and cannot be deleted.',
      );
    }

    const deleteTransactions = this.prismaSerice.transaction.deleteMany({
      where: { accountId: dto.id, userId },
    });

    const deleteAccount = this.prismaSerice.account.delete({
      where: { id: dto.id, userId },
    });
    return this.prismaSerice.$transaction([deleteTransactions, deleteAccount]);
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
