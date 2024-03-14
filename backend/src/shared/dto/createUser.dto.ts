import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { LoginUserDto } from './loginUser.dto';

export class CreateUserDto extends LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  username: string;
}
