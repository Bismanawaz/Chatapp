import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';     
import { UserEntity } from './entities/user.entity';
import { EntityModule } from './entities/entity.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { validate } from 'class-validator';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ChatService } from './chat/chat.service';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';


@Module({
  imports: [ 
    ConfigModule.forRoot({
      validate,
      expandVariables: true,
    }),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory : async(configService:ConfigService)=>({
        secret : configService.get<string>('jwt.secret'),
        signOptions:{
          expiresIn : configService.get<string>('jwt.expireIn'),
        },
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'abc123',
      database: 'chat',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      //logging: process.env.NODE_ENV === 'development',
    }),
    AuthModule,
    EntityModule,
    PassportModule,
    HttpModule,
    MessageModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, ChatService],
})
export class AppModule {}

