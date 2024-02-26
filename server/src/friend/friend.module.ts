import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from '@entities/Friend';
import { FriendGateway } from './friend.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Friend]), UserModule],
  providers: [FriendService, FriendGateway],
  controllers: [FriendController],
  exports: [FriendService],
})
export class FriendModule {}
