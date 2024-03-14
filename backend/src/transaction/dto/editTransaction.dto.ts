import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { CreateTransactionDto } from './createTransaction';

export class EditTransactionDto extends CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
