import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { createFriendDtoOutOf } from './dto/createFriend.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userServise: UserService) {}

  @Get()
  itswork() {
    return 'asd';
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body() CreateUserDto: CreateUserDto) {
    //@Body() CreateUserDto: CreateUserDto
    return this.userServise.create(CreateUserDto);
  }
}
