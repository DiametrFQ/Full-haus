import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { Server } from 'socket.io';

@WebSocketGateway()
export class UserGateway {
  constructor(private readonly userService: UserService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createUser')
  async createUser(@MessageBody() userDto: CreateUserDto) {
    const user = await this.userService.create(userDto);
    this.server.emit('take client user', user);
  }
}
