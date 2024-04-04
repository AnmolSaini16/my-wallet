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
exports.AddAccountDto = void 0;
const class_validator_1 = require("class-validator");
const expense_enum_1 = require("../../shared/enum/expense.enum");
class AddAccountDto {
}
exports.AddAccountDto = AddAccountDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(1, 25),
    __metadata("design:type", String)
], AddAccountDto.prototype, "account", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], AddAccountDto.prototype, "balance", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(expense_enum_1.BankGroupEnum),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddAccountDto.prototype, "group", void 0);
//# sourceMappingURL=addAccount.dto.js.map