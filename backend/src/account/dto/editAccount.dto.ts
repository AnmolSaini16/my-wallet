import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';
import { AddAccountDto } from './addAccount.dto';

export class EditAccountDto extends AddAccountDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
