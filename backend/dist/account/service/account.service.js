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
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
const common_enum_1 = require("../../shared/enum/common.enum");
const prisma_service_1 = require("../../prisma/prisma.service");
let AccountService = class AccountService {
    constructor(prismaSerice) {
        this.prismaSerice = prismaSerice;
    }
    async addAccount(dto, userId) {
        const accounts = await this.getUserAccociatedBankAccounts(userId);
        if (accounts?.length === 2) {
            throw new common_1.BadRequestException('Cannot add more than 2 accounts');
        }
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
    async editAccount(dto, userId) {
        const { id, ...restEditedData } = dto;
        return this.prismaSerice.account.update({
            where: { id, userId },
            data: {
                ...restEditedData,
            },
        });
    }
    async updateBalance(accountId, amount, bankBalanceUpdateType) {
        if (bankBalanceUpdateType === common_enum_1.BankBalanceUpdateType.Decrement) {
            return this.prismaSerice.account.update({
                where: {
                    id: accountId,
                },
                data: {
                    balance: { decrement: amount },
                },
            });
        }
        else {
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
    async getUserAccociatedBankAccounts(userId) {
        return this.prismaSerice.account.findMany({
            where: { userId },
        });
    }
    async getBankAccountFromAccountId(accountId) {
        return this.prismaSerice.account.findUnique({ where: { id: accountId } });
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccountService);
//# sourceMappingURL=account.service.js.map