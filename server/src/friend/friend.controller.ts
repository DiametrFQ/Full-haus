import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { createFriendDtoOutOf } from 'src/user/dto/createFriend.dto';
import { FriendService } from './friend.service';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  createFriendLink(@Body() createFriendDtoOutOf: createFriendDtoOutOf) {
    //@Body() CreateUserDto: CreateUserDto
    return this.friendService.createFriendOutOf(createFriendDtoOutOf);
  }
}
