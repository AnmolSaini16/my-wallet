import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { CreateUserDto } from 'src/shared/dto/createUser.dto';
import { LoginUserDto } from 'src/shared/dto/loginUser.dto';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: CreateUserDto) {
    //Check if email already in use
    let user = await this.userService.findUserByEmail(dto.email);
    if (user) {
      throw new ConflictException('Email already in use');
    }

    //Create new user
    user = await this.userService.createUser(dto);

    //Generate token
    const payload = { id: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    //return newly created user
    const { password, ...rest } = user;
    return { user: rest, token };
  }

  async login(dto: LoginUserDto) {
    //Find user associated with provided email
    let user = await this.userService.findUserByEmail(dto.email);

    //User not found
    if (!user) throw new NotFoundException('User not found');

    //Compare password
    if (!(await compare(dto.password, user.password))) {
      throw new BadRequestException('Incorrect password');
    }

    //Valid User
    //Generate token
    const payload = { id: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    //return user
    const { password, ...rest } = user;
    return { user: rest, token };
  }
}
