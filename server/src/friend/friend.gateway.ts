import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { FriendService } from './friend.service';
import { createFriendDtoOutOf } from './dto/createFriend.dto';
import { Server } from 'socket.io';

@WebSocketGateway()
export class FriendGateway {
  constructor(private readonly friendService: FriendService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createFriend')
  async createFriendLink(
    @MessageBody() createFriendDtoOutOf: createFriendDtoOutOf,
  ) {
    //@Body() CreateUserDto: CreateUserDto
    await this.friendService.createFriendOutOf(createFriendDtoOutOf);
    const friends = this.friendService.findAllFriends(
      createFriendDtoOutOf.idClient,
    );
    this.server.emit('take client friends', friends);
  }
}
