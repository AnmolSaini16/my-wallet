import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../../shared/dto/createUser.dto';
import { LoginUserDto } from '../../shared/dto/loginUser.dto';
import { UserService } from '../../user/service/user.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    signUp(dto: CreateUserDto): Promise<{
        user: {
            id: string;
            username: string;
            email: string;
            createdAt: Date;
            lastLogin: Date;
        };
        token: string;
    }>;
    login(dto: LoginUserDto): Promise<{
        user: {
            id: string;
            username: string;
            email: string;
            createdAt: Date;
            lastLogin: Date;
        };
        token: string;
    }>;
}
