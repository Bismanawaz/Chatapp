import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client: Socket = context.switchToWs().getClient();
    const token = client.handshake.headers.authorization?.split(' ')[1];  

    if (!token) {
      return false;  
    }

    try {
      const decoded = this.jwtService.verify(token);
      client.data.user = decoded;  
      return true;
    } catch (error) {
      console.log('JWT verification failed', error);
      return false;  
    }
  }
}
