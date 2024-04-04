import { IsString, IsEmail, Length, IsDate } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;

  @IsString()
  @Length(3, 20)
  username: string;

  @IsDate()
  lastLogin: Date;
}
