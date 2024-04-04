import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Min,
} from 'class-validator';
import {
  TransactionTypeEnum,
  TransactionTagEnum,
} from '../../shared/enum/expense.enum';

export class CreateTransactionDto {
  @IsEnum(TransactionTypeEnum)
  @IsNotEmpty()
  type: TransactionTypeEnum;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  accountId: string;

  @IsString()
  @IsNotEmpty()
  accountName: string;

  @IsNumber()
  @IsPositive()
  @Min(1)
  amount: number;

  @IsEnum(TransactionTagEnum)
  tag: string;

  @IsOptional()
  @Length(0, 200)
  note: string;

  @IsString()
  @IsNotEmpty()
  createdAt: string;
}
