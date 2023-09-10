import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { AuthUserDto } from './dto/authUser.dto';
import { AuthService } from './auth.service';
import { Server } from 'socket.io';

@WebSocketGateway()
export class AuthGateway {
  constructor(private readonly authServ: AuthService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('authenticate')
  async authenticateEvent(@MessageBody() authData: AuthUserDto) {
    const info = authData.getInfo();
    const client = await this.authServ.signIn(...info);
    this.server.emit('authentication passed', client);
  }
}
