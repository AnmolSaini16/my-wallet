import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';

import { User } from 'src/shared/decorator/user.decorator';
import { UserDto } from 'src/shared/dto/user.dto';
import { AddAccountDto } from '../dto/addAccount.dto';
import { AccountService } from '../service/account.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { EditAccountDto } from '../dto/editAccount.dto';

@UseGuards(AuthGuard)
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  async addAccount(@Body() dto: AddAccountDto, @User() user: UserDto) {
    return this.accountService.addAccount(dto, user.id);
  }

  @Patch()
  async editAccount(@Body() dto: EditAccountDto, @User() user: UserDto) {
    return this.accountService.editAccount(dto, user.id);
  }

  @Get()
  async getAccounts(@User() user: UserDto) {
    return this.accountService.getUserAccociatedBankAccounts(user.id);
  }

  //Todo delete account
}
