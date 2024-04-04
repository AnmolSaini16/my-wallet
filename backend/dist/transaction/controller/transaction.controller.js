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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const transaction_service_1 = require("../service/transaction.service");
const createTransaction_1 = require("../dto/createTransaction");
const editTransaction_dto_1 = require("../dto/editTransaction.dto");
const deleteTransaction_dto_1 = require("../dto/deleteTransaction.dto");
const transactionsSearchQuery_1 = require("../query/transactionsSearchQuery");
const auth_guard_1 = require("../../auth/guard/auth.guard");
const user_decorator_1 = require("../../shared/decorator/user.decorator");
const user_dto_1 = require("../../shared/dto/user.dto");
let TransactionController = class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    createTransaction(dto, user) {
        return this.transactionService.createTransaction(dto, user.id);
    }
    editTransaction(dto, user) {
        return this.transactionService.editTransaction(dto, user.id);
    }
    deleteTransaction(dto) {
        return this.transactionService.deleteTransaction(dto);
    }
    getTransactions(params, user) {
        return this.transactionService.getTransactions(params, user.id);
    }
};
exports.TransactionController = TransactionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createTransaction_1.CreateTransactionDto, user_dto_1.UserDto]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "createTransaction", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [editTransaction_dto_1.EditTransactionDto, user_dto_1.UserDto]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "editTransaction", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteTransaction_dto_1.DeleteTransactionDto]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "deleteTransaction", null);
__decorate([
    (0, common_1.Get)('getTransactions'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transactionsSearchQuery_1.TransactionSearchQuery,
        user_dto_1.UserDto]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "getTransactions", null);
exports.TransactionController = TransactionController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('transaction'),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService])
], TransactionController);
//# sourceMappingURL=transaction.controller.js.map