import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class UserValidationDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  password: string
}

export class UserAuthValidationDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @MaxLength(16)
  @MinLength(8)
  password: string
}
