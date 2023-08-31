import { IsPhoneNumber, MinLength } from 'class-validator';

export class AuthUserDto {
  @IsPhoneNumber()
  phoneNumber: string;

  @MinLength(0, { message: 'You have not entered a password' })
  password: string;

  getInfo(): [string, string] {
    return [this.phoneNumber, this.password];
  }
}
