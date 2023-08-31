import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { FriendService } from './friend.service';
import { createFriendDtoOutOf } from './dto/createFriend.dto';

@WebSocketGateway()
export class FriendGateway {
  constructor(private readonly friendService: FriendService) {}

  @SubscribeMessage('createFriend')
  createFriendLink(@MessageBody() createFriendDtoOutOf: createFriendDtoOutOf) {
    //@Body() CreateUserDto: CreateUserDto
    this.friendService.createFriendOutOf(createFriendDtoOutOf);
  }
}
