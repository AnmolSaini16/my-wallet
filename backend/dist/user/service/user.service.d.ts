import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../../shared/dto/createUser.dto';
import { UpdateUserDto } from '../../shared/dto/updateUser.dto';
export declare class UserService {
    private prismaSerice;
    private validator;
    constructor(prismaSerice: PrismaService);
    createUser(dto: CreateUserDto): Promise<{
        id: string;
        username: string;
        email: string;
        password: string;
        createdAt: Date;
        lastLogin: Date;
    }>;
    updateUser(id: string, dto: Partial<UpdateUserDto>): Promise<{
        id: string;
        username: string;
        email: string;
        password: string;
        createdAt: Date;
        lastLogin: Date;
    }>;
    getUserInfo(email: string): Promise<{
        id: string;
        username: string;
        email: string;
        createdAt: Date;
        lastLogin: Date;
    }>;
    findUserByEmail(email: string): Promise<{
        id: string;
        username: string;
        email: string;
        password: string;
        createdAt: Date;
        lastLogin: Date;
    }>;
}
