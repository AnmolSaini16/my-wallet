import { Module } from '@nestjs/common';
import { TransactionController } from './controller/transaction.controller';
import { TransactionService } from './service/transaction.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AccountModule } from 'src/account/account.module';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [PrismaModule, AccountModule],
})
export class TransactionModule {}
