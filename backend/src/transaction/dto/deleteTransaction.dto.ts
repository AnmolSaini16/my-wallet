import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class DeleteTransactionDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  transactionId: string;
}
