import {
  WebSocketGateway, WebSocketServer,
  SubscribeMessage, MessageBody, ConnectedSocket,
  OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from 'src/entities/user.entity';
import { CreateMessageDto } from 'src/dto/create-message.dto';
import { MessageService } from 'src/message/message.service';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from 'src/guards/ws-jwt.gaurd';
import { Auth } from 'typeorm';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private users: { [clientId: string]: UserEntity } = {}; 
  private readonly jwtService:JwtService
  private readonly authService: AuthService;
  private readonly messageService : MessageService;

  constructor(jwtService: JwtService, authService:AuthService , messageService: MessageService) {
    this.jwtService = jwtService;
    this.authService = authService;
    this.messageService = messageService; 
  }

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  async handleConnection(client: Socket) {
    const token = client.handshake.auth.token; 
    if (!token) {
      console.log(`Client ${client.id} did not provide a token.`);
      client.disconnect(); 
      return;
    }
    try {
      const payload = this.jwtService.verify(token); 
      const user = await this.authService.findUserById(payload.userId); 
      if (user) {
        this.users[client.id] = user;
        this.server.emit('users', this.users);
        console.log(`Client connected: ${client.id} as ${user.username}`);
      } else {
        console.log(`User not found for token, disconnecting client ${client.id}.`);
        client.disconnect();
      }
    } catch (error) {
      console.error(`Invalid token from client ${client.id}:`, error.message);
      client.disconnect(); 
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    delete this.users[client.id];
    this.server.emit('users', this.users); 
  }

  @SubscribeMessage('join')
  handleJoin(@ConnectedSocket() client: Socket) {
    const user = this.users[client.id]
    if (user) {
      console.log(`${user.username} joined the chat`);
      this.server.emit('users', this.users); 
    }
  }
  
  @SubscribeMessage('message')
  async handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: { message: string }) {
    const user = this.users[client.id]
    if (user) {
      const createMessageDto: CreateMessageDto = {
        content: data.message,
        username: user.username,
        userId: user.userId,
        user: ''
      }
      await this.messageService.createMessage(createMessageDto); 
      this.server.emit('message', { username: user.username, message: data.message });
    }
    else {
      console.log(`Client with ID ${client.id} attempted to send a message without joining.`);
    }
  }

}
