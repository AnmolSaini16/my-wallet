import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcrypt';

import { IsMongoId, Validator } from 'class-validator';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../../shared/dto/createUser.dto';
import { UpdateUserDto } from '../../shared/dto/updateUser.dto';

@Injectable()
export class UserService {
  private validator: Validator;

  constructor(private prismaSerice: PrismaService) {
    this.validator = new Validator();
  }

  async createUser(dto: CreateUserDto) {
    return this.prismaSerice.user.create({
      data: {
        ...dto,
        email: dto.email.toLowerCase(),
        password: await hash(dto.password, 10),
      },
    });
  }

  async updateUser(id: string, dto: Partial<UpdateUserDto>) {
    if (!this.validator.validate(id, IsMongoId()))
      throw new BadRequestException('Id must be a type of MongoId');

    return this.prismaSerice.user.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async getUserInfo(email: string) {
    const user = await this.findUserByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    const { password, ...rest } = user;
    return rest;
  }

  async findUserByEmail(email: string) {
    const emailLower = email.toLowerCase();
    const user = await this.prismaSerice.user.findFirst({
      where: { email: emailLower },
    });
    return user;
  }
}
