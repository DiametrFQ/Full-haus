import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { FriendModule } from './friend/friend.module';

@Module({
<<<<<<< HEAD
  imports:[
    ConfigModule.forRoot({ isGlobal:true }),
    GatewayModule
=======
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configServise: ConfigService) => ({
        type: 'postgres',
        host: configServise.get('DB_HOST'),
        port: +configServise.get('DB_PORT'),
        username: configServise.get('DB_USERNAME'),
        password: configServise.get('DB_PASSWORD'),
        name: configServise.get('DB_NAME'),
        autoLoadModels: true,
        synchronize: true,
        entities: [__dirname + '/database/entities/*{.js, .ts}'],
        migrations: ['./dabaase'],
        migrationsTableName: 'custom_migration_table',
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    ChatModule,
    FriendModule,
>>>>>>> 92acd0b582324a2bd772b88ba492d7d60a505083
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
