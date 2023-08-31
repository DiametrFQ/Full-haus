import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '@entities/Client';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Client) private readonly userRep: Repository<Client>,
  ) {}

  async create(CreateUserDto: CreateUserDto) {
    const existUser = await this.findOneByPhone(CreateUserDto.phoneNumber);

    if (existUser) throw new BadRequestException('Email is exists');

    try {
      const client = await this.userRep.save({
        name: CreateUserDto.name,
        phone: CreateUserDto.phoneNumber,
        password: await argon2.hash(
          process.env.SECRET_KEY + CreateUserDto.password,
        ),
      });

      return { client };
    } catch (error) {
      throw new BadRequestException('An error was made in getting data');
    }
  }

  async findOneByPhone(phone: string) {
    return await this.userRep.findOne({ where: { phone } });
  }

  async findOneById(id: number) {
    return await this.userRep.findOne({ where: { id } });
  }
}
