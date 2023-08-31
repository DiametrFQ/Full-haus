import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { AuthGateway } from './auth.gateway';

@Module({
  imports: [UserModule],
  providers: [AuthService, AuthGateway],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
