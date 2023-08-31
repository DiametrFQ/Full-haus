import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatCreateDto } from './dto/chatCreate.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatServbice: ChatService) {}

  @Post('create')
  createChat(@Body() ChatCreateDto: ChatCreateDto) {
    this.chatServbice.createChat(ChatCreateDto.idCreator);
  }
}
