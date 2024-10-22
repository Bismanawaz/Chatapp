import { Controller, Get } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Get()
    async getAllMessages (): Promise<any>{
        return await this.messageService.getAllMessages();
    }
   
}