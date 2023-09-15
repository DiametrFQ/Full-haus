import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    ConfigModule.forRoot({ isGlobal:true }),
    GatewayModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
