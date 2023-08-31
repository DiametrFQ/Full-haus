import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { AuthUserDto } from './dto/authUser.dto';
import { AuthService } from './auth.service';

@WebSocketGateway()
export class AuthGateway {
  constructor(private readonly authServ: AuthService) {}

  @SubscribeMessage('testChat')
  async authenticateEvent(@MessageBody() authData: AuthUserDto) {
    const info = authData.getInfo();
    return await this.authServ.signIn(...info);
  }
}
