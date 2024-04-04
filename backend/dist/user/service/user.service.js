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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
const class_validator_1 = require("class-validator");
const prisma_service_1 = require("../../prisma/prisma.service");
let UserService = class UserService {
    constructor(prismaSerice) {
        this.prismaSerice = prismaSerice;
        this.validator = new class_validator_1.Validator();
    }
    async createUser(dto) {
        return this.prismaSerice.user.create({
            data: {
                ...dto,
                email: dto.email.toLowerCase(),
                password: await (0, bcrypt_1.hash)(dto.password, 10),
            },
        });
    }
    async updateUser(id, dto) {
        if (!this.validator.validate(id, (0, class_validator_1.IsMongoId)()))
            throw new common_1.BadRequestException('Id must be a type of MongoId');
        return this.prismaSerice.user.update({
            where: { id },
            data: {
                ...dto,
            },
        });
    }
    async getUserInfo(email) {
        const user = await this.findUserByEmail(email);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const { password, ...rest } = user;
        return rest;
    }
    async findUserByEmail(email) {
        const emailLower = email.toLowerCase();
        const user = await this.prismaSerice.user.findFirst({
            where: { email: emailLower },
        });
        return user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map