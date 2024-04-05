import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class DeleteAccountDTO {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
