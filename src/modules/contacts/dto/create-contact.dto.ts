import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(9)
  @IsNotEmpty()
  tel: string;

  @IsString()
  @IsNotEmpty()
  user_id?: string;
}
