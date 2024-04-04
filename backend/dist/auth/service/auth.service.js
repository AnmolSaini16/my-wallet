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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const user_service_1 = require("../../user/service/user.service");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async signUp(dto) {
        let user = await this.userService.findUserByEmail(dto.email);
        if (user) {
            throw new common_1.ConflictException('Email already in use');
        }
        user = await this.userService.createUser(dto);
        const payload = { id: user.id, email: user.email };
        const token = await this.jwtService.signAsync(payload);
        const { password, ...rest } = user;
        return { user: rest, token };
    }
    async login(dto) {
        let user = await this.userService.findUserByEmail(dto.email);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (!(await (0, bcrypt_1.compare)(dto.password, user.password))) {
            throw new common_1.BadRequestException('Incorrect password');
        }
        const payload = { id: user.id, email: user.email };
        const token = await this.jwtService.signAsync(payload);
        const { password, ...rest } = user;
        return { user: rest, token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map