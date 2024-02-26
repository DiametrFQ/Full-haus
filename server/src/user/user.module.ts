import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '@entities/Client';
import { UserGateway } from './user.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [UserController],
  providers: [UserService, UserGateway],
  exports: [UserService],
})
export class UserModule {}
