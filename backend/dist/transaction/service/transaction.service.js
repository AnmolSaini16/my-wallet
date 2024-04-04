"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const account_service_1 = require("../../account/service/account.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const common_enum_1 = require("../../shared/enum/common.enum");
const expense_enum_1 = require("../../shared/enum/expense.enum");
let TransactionService = class TransactionService {
    constructor(prismaSerice, accountService) {
        this.prismaSerice = prismaSerice;
        this.accountService = accountService;
    }
    async createTransaction(dto, userId) {
        const { accountId, ...rest } = dto;
        const bankBalanceUpdateType = dto.type === expense_enum_1.TransactionTypeEnum.Income
            ? common_enum_1.BankBalanceUpdateType.Increment
            : common_enum_1.BankBalanceUpdateType.Decrement;
        const bankAccount = await this.accountService.getBankAccountFromAccountId(accountId);
        if (!bankAccount) {
            throw new common_1.NotFoundException(common_enum_1.ErrorMessage.BankNotFoundMsg);
        }
        const [_, transaction] = await Promise.all([
            this.accountService.updateBalance(bankAccount.id, dto.amount, bankBalanceUpdateType),
            this.prismaSerice.transaction.create({
                data: {
                    ...rest,
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
    async editTransaction(dto, userId) {
        const { id, accountId, ...restEditedData } = dto;
        const initialTransaction = await this.prismaSerice.transaction.findUnique({
            where: { id },
        });
        if (!initialTransaction) {
            throw new common_1.NotFoundException(common_enum_1.ErrorMessage.InvalidTransaction);
        }
        await Promise.all([
            this.prismaSerice.transaction.delete({ where: { id } }),
            this.accountService.updateBalance(initialTransaction.accountId, initialTransaction.amount, initialTransaction.type === expense_enum_1.TransactionTypeEnum.Income
                ? common_enum_1.BankBalanceUpdateType.Decrement
                : common_enum_1.BankBalanceUpdateType.Increment),
        ]);
        const updatedTransaction = await this.prismaSerice.transaction.create({
            data: {
                ...restEditedData,
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
        await this.accountService.updateBalance(updatedTransaction.accountId, updatedTransaction.amount, updatedTransaction.type === expense_enum_1.TransactionTypeEnum.Income
            ? common_enum_1.BankBalanceUpdateType.Increment
            : common_enum_1.BankBalanceUpdateType.Decrement);
        return updatedTransaction;
    }
    async deleteTransaction(dto) {
        const { transactionId } = dto;
        const trasanctionToDelete = await this.prismaSerice.transaction.findUnique({
            where: {
                id: transactionId,
            },
        });
        if (!trasanctionToDelete) {
            throw new common_1.NotFoundException(common_enum_1.ErrorMessage.InvalidTransaction);
        }
        await Promise.all([
            this.prismaSerice.transaction.delete({ where: { id: transactionId } }),
            this.accountService.updateBalance(trasanctionToDelete.accountId, trasanctionToDelete.amount, trasanctionToDelete.type === expense_enum_1.TransactionTypeEnum.Income
                ? common_enum_1.BankBalanceUpdateType.Decrement
                : common_enum_1.BankBalanceUpdateType.Increment),
        ]);
        return;
    }
    async getTransactions(params, userId) {
        const { skip, take, year } = params;
        const startOfYear = year ? new Date(`${year}-01-01T00:00:00.000Z`) : null;
        const endOfYear = year ? new Date(`${year}-12-31T23:59:59.999Z`) : null;
        const whereClause = year
            ? {
                userId,
                createdAt: {
                    gte: startOfYear.toISOString(),
                    lte: endOfYear.toISOString(),
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
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        account_service_1.AccountService])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map