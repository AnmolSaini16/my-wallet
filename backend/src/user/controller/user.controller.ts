import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';

import { UserService } from '../service/user.service';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { User } from '../../shared/decorator/user.decorator';
import { UpdateUserDto } from '../../shared/dto/updateUser.dto';
import { UserDto } from '../../shared/dto/user.dto';

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
