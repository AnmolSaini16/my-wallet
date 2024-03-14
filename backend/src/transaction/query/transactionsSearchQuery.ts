import { Transform } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class TransactionSearchQuery {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  skip: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  take: number;

  @IsOptional()
  @IsString()
  year: string;
}
