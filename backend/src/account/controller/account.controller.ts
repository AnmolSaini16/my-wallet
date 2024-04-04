import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';

import { AddAccountDto } from '../dto/addAccount.dto';
import { AccountService } from '../service/account.service';
import { EditAccountDto } from '../dto/editAccount.dto';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { User } from '../../shared/decorator/user.decorator';
import { UserDto } from '../../shared/dto/user.dto';

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
