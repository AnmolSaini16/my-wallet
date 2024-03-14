import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';

import { UserService } from '../service/user.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UserDto } from 'src/shared/dto/user.dto';
import { User } from 'src/shared/decorator/user.decorator';
import { UpdateUserDto } from 'src/shared/dto/updateUser.dto';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUserInfo(@User() user: UserDto) {
    return this.userService.getUserInfo(user.email);
  }

  @Patch()
  updateUserInfo(@Body() dto: Partial<UpdateUserDto>, @User() user: UserDto) {
    return this.userService.updateUser(user.id, dto);
  }
}
