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
exports.AccountController = void 0;
const common_1 = require("@nestjs/common");
const addAccount_dto_1 = require("../dto/addAccount.dto");
const account_service_1 = require("../service/account.service");
const editAccount_dto_1 = require("../dto/editAccount.dto");
const auth_guard_1 = require("../../auth/guard/auth.guard");
const user_decorator_1 = require("../../shared/decorator/user.decorator");
const user_dto_1 = require("../../shared/dto/user.dto");
let AccountController = class AccountController {
    constructor(accountService) {
        this.accountService = accountService;
    }
    async addAccount(dto, user) {
        return this.accountService.addAccount(dto, user.id);
    }
    async editAccount(dto, user) {
        return this.accountService.editAccount(dto, user.id);
    }
    async getAccounts(user) {
        return this.accountService.getUserAccociatedBankAccounts(user.id);
    }
};
exports.AccountController = AccountController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addAccount_dto_1.AddAccountDto, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "addAccount", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [editAccount_dto_1.EditAccountDto, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "editAccount", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAccounts", null);
exports.AccountController = AccountController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('account'),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], AccountController);
//# sourceMappingURL=account.controller.js.map