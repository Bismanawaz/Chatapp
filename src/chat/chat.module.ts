// // import { Module } from '@nestjs/common';
// // import { JwtModule, JwtService } from '@nestjs/jwt';
// // import { ChatGateway } from './chat.gateway';
// // import { ChatService } from './chat.service';
// // import { AuthModule } from '../auth/auth.module';
// // import { MessageModule } from 'src/message/message.module';
// // import { PassportModules } from 'src/passport/passport.module';
// // import { AuthService } from 'src/auth/auth.service';
// // import { UserEntity } from 'src/entities/user.entity';
// // import { MessageEntity } from 'src/entities/message.entity';
// // import { TypeOrmModule } from '@nestjs/typeorm';
// // import { MessageService } from 'src/message/message.service';

// // @Module({
// //   imports: [TypeOrmModule.forFeature([MessageEntity]),
// //     JwtModule.register({
// //       secret: process.env.JWT_SECRET || 'your-secret-key',
// //       signOptions: { expiresIn: '100d' },
// //     }),
// //     AuthModule,
// //     MessageModule, PassportModules,
// //     UserEntity,
// //   ],
// //   providers: [ChatService, ChatGateway, AuthService,MessageService],
// //   exports:[ChatService,MessageService],
// // })
// // export class ChatModule { }


// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { ChatGateway } from './chat.gateway';
// import { ChatService } from './chat.service';
// import { AuthModule } from '../auth/auth.module';  // Correct import for AuthModule
// import { MessageModule } from 'src/message/message.module';
// import { PassportModules } from 'src/passport/passport.module';
// import { TypeOrmModule } from '@nestjs/typeorm';  // Ensure entities are properly imported
// import { MessageEntity } from 'src/entities/message.entity';  // MessageEntity import
// import { MessageService } from 'src/message/message.service';  // Correct import for MessageService

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([MessageEntity]),  // Include entity here
//     JwtModule.register({
//       secret: process.env.JWT_SECRET || 'your-secret-key',
//       signOptions: { expiresIn: '100d' },
//     }),
//     AuthModule,  // Import AuthModule for AuthService injection
//     MessageModule,  // Import MessageModule for message handling
//     PassportModules,
//   ],
//   providers: [ChatService, ChatGateway, MessageService],  // Provide necessary services
//   exports: [ChatService, MessageService],
// })
// export class ChatModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from 'src/message/message.service';
import { MessageEntity } from 'src/entities/message.entity';
import { AuthModule } from 'src/auth/auth.module';  

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity]),
    AuthModule,  
  ],
  providers: [MessageService],
  exports: [MessageService],
})
export class ChatModule {}