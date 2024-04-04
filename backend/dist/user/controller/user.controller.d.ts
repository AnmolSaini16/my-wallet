import { UserService } from '../service/user.service';
import { UpdateUserDto } from '../../shared/dto/updateUser.dto';
import { UserDto } from '../../shared/dto/user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUserInfo(user: UserDto): Promise<{
        id: string;
        username: string;
        email: string;
        createdAt: Date;
        lastLogin: Date;
    }>;
    updateUserInfo(dto: Partial<UpdateUserDto>, user: UserDto): Promise<{
        id: string;
        username: string;
        email: string;
        password: string;
        createdAt: Date;
        lastLogin: Date;
    }>;
}
