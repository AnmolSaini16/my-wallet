import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTransactionDto } from '../dto/createTransaction';
import { EditTransactionDto } from '../dto/editTransaction.dto';
import { DeleteTransactionDto } from '../dto/deleteTransaction.dto';
import { TransactionSearchQuery } from '../query/transactionsSearchQuery';
import { AccountService } from '../../account/service/account.service';
import { PrismaService } from '../../prisma/prisma.service';
import {
  BankBalanceUpdateType,
  ErrorMessage,
} from '../../shared/enum/common.enum';
import { TransactionTypeEnum } from '../../shared/enum/expense.enum';
import { Transaction } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(
    private prismaSerice: PrismaService,
    private accountService: AccountService,
  ) {}

  async createTransaction(
    dto: CreateTransactionDto,
    userId: string,
  ): Promise<Transaction> {
    const { accountId, ...rest } = dto;
    //Check transaction type
    const bankBalanceUpdateType =
      dto.type === TransactionTypeEnum.Income
        ? BankBalanceUpdateType.Increment
        : BankBalanceUpdateType.Decrement;

    //Find bank account and update balance
    const bankAccount =
      await this.accountService.getBankAccountFromAccountId(accountId);

    if (!bankAccount) {
      throw new NotFoundException(ErrorMessage.BankNotFoundMsg);
    }

    const [_, transaction] = await Promise.all([
      //Update balance service
      this.accountService.updateBalance(
        bankAccount.id,
        dto.amount,
        bankBalanceUpdateType,
      ),
      // Create transaction
      this.prismaSerice.transaction.create({
        data: {
          ...rest,
          //Relation
          user: {
            connect: {
              id: userId,
            },
          },
          account: {
            connect: {
              id: accountId,
            },
          },
        },
      }),
    ]);

    return transaction;
  }

  //Todo - Better way to write
  async editTransaction(dto: EditTransactionDto, userId: string) {
    const { id, accountId, ...restEditedData } = dto;

    const initialTransaction = await this.prismaSerice.transaction.findUnique({
      where: { id },
    });

    if (!initialTransaction) {
      throw new NotFoundException(ErrorMessage.InvalidTransaction);
    }

    // Delete previous transaction and update balance
    await Promise.all([
      this.prismaSerice.transaction.delete({ where: { id } }),
      this.accountService.updateBalance(
        initialTransaction.accountId,
        initialTransaction.amount,
        initialTransaction.type === TransactionTypeEnum.Income
          ? BankBalanceUpdateType.Decrement
          : BankBalanceUpdateType.Increment,
      ),
    ]);

    //Create Transaction
    const updatedTransaction = await this.prismaSerice.transaction.create({
      data: {
        ...restEditedData,
        //Relation
        user: {
          connect: {
            id: userId,
          },
        },
        account: {
          connect: {
            id: accountId,
          },
        },
      },
    });

    ///update to latest balance
    await this.accountService.updateBalance(
      updatedTransaction.accountId,
      updatedTransaction.amount,
      updatedTransaction.type === TransactionTypeEnum.Income
        ? BankBalanceUpdateType.Increment
        : BankBalanceUpdateType.Decrement,
    );

    //Return updated transaction
    return updatedTransaction;
  }

  async deleteTransaction(dto: DeleteTransactionDto): Promise<void> {
    const { transactionId } = dto;
    //FInd the transaction linked with provided id
    const trasanctionToDelete = await this.prismaSerice.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });

    //Not found
    if (!trasanctionToDelete) {
      throw new NotFoundException(ErrorMessage.InvalidTransaction);
    }

    //Delete the transaction and update Bank Balance
    // - If income type is deleted, decrement from bank balance else increment as expense type is deleted
    await Promise.all([
      //Delete the transaction
      this.prismaSerice.transaction.delete({ where: { id: transactionId } }),

      //Update balance service
      this.accountService.updateBalance(
        trasanctionToDelete.accountId,
        trasanctionToDelete.amount,
        trasanctionToDelete.type === TransactionTypeEnum.Income
          ? BankBalanceUpdateType.Decrement
          : BankBalanceUpdateType.Increment,
      ),
    ]);

    return;
  }

  async getTransactions(
    params: TransactionSearchQuery,
    userId: string,
  ): Promise<Transaction[]> {
    const { skip, take, year } = params;

    const startOfYear = year ? new Date(`${year}-01-01T00:00:00.000Z`) : null;
    const endOfYear = year ? new Date(`${year}-12-31T23:59:59.999Z`) : null;

    const whereClause = year
      ? {
          userId,
          createdAt: {
            gte: startOfYear!.toISOString(),
            lte: endOfYear!.toISOString(),
          },
        }
      : { userId };

    return this.prismaSerice.transaction.findMany({
      skip,
      take,
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });
  }
}
