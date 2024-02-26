import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async signIn(phoneNumber: string, password: string) {
    const findUser = await this.usersService.findOneByPhone(phoneNumber);

    if (!findUser)
      throw new UnauthorizedException('Incorrect phone or password');

    const passIsMatch = await argon2.verify(
      findUser.password,
      process.env.SECRET_KEY + password,
    );

    if (!passIsMatch)
      throw new UnauthorizedException('Incorrect phone or password');

    return findUser;
  }
}
