import { IsPhoneNumber, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(0, { message: 'You have not entered a password' })
  name: string;

  @MinLength(10, { message: 'So low numbers' })
  phoneNumber: string;

  @MinLength(6, { message: 'Password is so little' })
  password: string;
}
