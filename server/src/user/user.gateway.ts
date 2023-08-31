import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@WebSocketGateway()
export class UserGateway {
  constructor(private readonly userService: UserService) {}

  @SubscribeMessage('createUser')
  async createUser(@MessageBody() userDto: CreateUserDto) {
    await this.userService.create(userDto);
  }
}
