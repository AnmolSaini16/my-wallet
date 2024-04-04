import { AuthService } from '../service/auth.service';
import { CreateUserDto } from '../../shared/dto/createUser.dto';
import { LoginUserDto } from '../../shared/dto/loginUser.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
