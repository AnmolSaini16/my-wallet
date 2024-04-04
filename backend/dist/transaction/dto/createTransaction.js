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
exports.CreateTransactionDto = void 0;
const class_validator_1 = require("class-validator");
const expense_enum_1 = require("../../shared/enum/expense.enum");
class CreateTransactionDto {
}
exports.CreateTransactionDto = CreateTransactionDto;
__decorate([
    (0, class_validator_1.IsEnum)(expense_enum_1.TransactionTypeEnum),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "accountId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "accountName", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateTransactionDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(expense_enum_1.TransactionTagEnum),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "tag", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 200),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "note", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "createdAt", void 0);
//# sourceMappingURL=createTransaction.js.map