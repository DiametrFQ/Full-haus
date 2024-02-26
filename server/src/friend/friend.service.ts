import { Injectable, BadRequestException } from '@nestjs/common';
import { createFriendDtoOutOf } from './dto/createFriend.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, FindOptionsWhere, Repository } from 'typeorm';
import { Friend } from '@entities/Friend';
import { UserService } from 'src/user/user.service';
import { Client } from '@entities/Client';

@Injectable()
export class FriendService {
  constructor(
    private readonly usersService: UserService,
    @InjectRepository(Friend) private readonly friendRep: Repository<Friend>,
  ) {}

  async createFriendOutOf({ idClient, idAnother }: createFriendDtoOutOf) {
    const existUser = await this.usersService.findOneById(idClient);
    const existAnother = await this.usersService.findOneById(idAnother);

    if (!existAnother)
      throw new BadRequestException('ExistAnother is not exists');

    if (await this.friendCheck(existUser, existAnother))
      throw new BadRequestException('They are already friends');

    try {
      const friendLink = await this.friendRep.save({
        client: existUser,
        friend: existAnother,
      });

      return { friendLink };
    } catch (error) {
      throw new BadRequestException('An error was made in getting data');
    }
  }
  async findAllFriends(idClient: number) {
    return await this.friendRep.find({ where: { id: idClient } });
  }

  async friendCheck(existUser: Client, existAnother: Client) {
    const FriendLink = await this.findOnebyFriendLink(existUser, existAnother);
    const altrerFriendLink = await this.findOnebyFriendLink(
      existAnother,
      existUser,
    );
    return FriendLink || altrerFriendLink;
  }

  async findOnebyFriendLink(client: Client, friend: Client) {
    return await this.friendRep.findOne({
      where: {
        client: client as FindOptionsWhere<Client>,
        friend: friend as FindOptionsWhere<Client>,
      },
    });
  }
}
