import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { BankGroupEnum } from '../../shared/enum/expense.enum';

export class AddAccountDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 25)
  account: string;

  @IsNumber()
  @IsPositive()
  balance: number;

  @IsEnum(BankGroupEnum)
  @IsNotEmpty()
  group: BankGroupEnum;
}
