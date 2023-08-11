import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    ConfigModule.forRoot({ isGlobal:true }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: (configServise: ConfigService) => ({
        type: "postgres",
        host: configServise.get('DB_HOST'),
        port: configServise.get('DB_PORT'),
        username: configServise.get('DB_USERNAME'),
        password: configServise.get('DB_PASSWORD'),
        name: configServise.get('DB_NAME'),
        autoLoadModels: true,
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
      }),
      inject: [ConfigService]
    }), 
    GatewayModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
