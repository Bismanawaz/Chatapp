import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { ChatGateway } from 'src/chat/chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from 'src/entities/message.entity';
import { PassportModules } from 'src/passport/passport.module';
import { EntityModule } from 'src/entities/entity.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[EntityModule, PassportModules, AuthModule],
  controllers: [MessageController],
  providers: [MessageService,ChatGateway],
  exports:[MessageService]
})
export class MessageModule {}
