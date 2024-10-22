import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  private readonly messages: { user: string; message: string; timestamp: Date }[] = [];
  private readonly activeUsers: Set<string> = new Set();

  constructor() {}

  
  addMessage(user: string, message: string) {
    const newMessage = { user, message, timestamp: new Date() };
    this.messages.push(newMessage);  
    console.log(`Message from ${user}: ${message}`);
  }

  
  getMessages() {
    return this.messages;
  }

  
  addActiveUser(username: string) {
    this.activeUsers.add(username);
  }

  
  removeActiveUser(username: string) {
    this.activeUsers.delete(username);
  }

  
  getActiveUsers() {
    return Array.from(this.activeUsers);
  }
}

