import { Module } from '@nestjs/common';
import { AccountController } from './controller/account.controller';
import { AccountService } from './service/account.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [PrismaModule],
  exports: [AccountService],
})
export class AccountModule {}
