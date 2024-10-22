import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from 'src/entities/message.entity';
import { CreateMessageDto } from 'src/dto/create-message.dto';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,  
  ) {}

  async createMessage(createMessageDto: CreateMessageDto): Promise<MessageEntity> {
    const { username, content, userId } = createMessageDto;

    
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    
    const newMessage = this.messageRepository.create({
      content,
      username,
      userId,  
       
    });

   
    await this.messageRepository.save(newMessage);
    return newMessage;
  }

  async getMessages(): Promise<MessageEntity[]> {
    return await this.messageRepository.find();
  }

  async getAllMessages(): Promise<MessageEntity[]> {
    return await this.messageRepository.find({
      order: { createdAt: 'ASC' },
    });
  }
}