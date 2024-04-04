import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { TransactionService } from '../service/transaction.service';
import { CreateTransactionDto } from '../dto/createTransaction';
import { EditTransactionDto } from '../dto/editTransaction.dto';
import { DeleteTransactionDto } from '../dto/deleteTransaction.dto';
import { TransactionSearchQuery } from '../query/transactionsSearchQuery';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { User } from '../../shared/decorator/user.decorator';
import { UserDto } from '../../shared/dto/user.dto';

@UseGuards(AuthGuard)
@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  createTransaction(@Body() dto: CreateTransactionDto, @User() user: UserDto) {
    return this.transactionService.createTransaction(dto, user.id);
  }

  @Put()
  editTransaction(@Body() dto: EditTransactionDto, @User() user: UserDto) {
    return this.transactionService.editTransaction(dto, user.id);
  }

  @Delete()
  deleteTransaction(@Body() dto: DeleteTransactionDto) {
    return this.transactionService.deleteTransaction(dto);
  }

  @Get('getTransactions')
  getTransactions(
    @Query() params: TransactionSearchQuery,
    @User() user: UserDto,
  ) {
    return this.transactionService.getTransactions(params, user.id);
  }
}
