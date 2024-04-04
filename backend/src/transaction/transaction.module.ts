import { Module } from '@nestjs/common';
import { TransactionController } from './controller/transaction.controller';
import { TransactionService } from './service/transaction.service';
import { AccountModule } from '../account/account.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [PrismaModule, AccountModule],
})
export class TransactionModule {}
