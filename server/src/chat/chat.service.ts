import { Chat } from '@entities/Chat';
import { Client } from '@entities/Client';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayOverlap, Repository } from 'typeorm';
import MsgSendDto from './dto/msgSend.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Client) private readonly clientRep: Repository<Client>,
    @InjectRepository(Chat) private readonly chatRep: Repository<Chat>,
  ) {}

  async createChat(idClient: number) {
    const User = await this.clientRep.findOne({ where: { id: idClient } });

    const chat = await this.chatRep.save({ idCreator: User });

    return chat;

    // return await this.chatRep.save({
    //   idCreator: await this.clientRep.findOne({ where: { id } }),
    // });
  }

  async findAll(id: number) {
    return await this.clientRep.find({ where: { id } });
  }

  async sendMsg(msg: MsgSendDto) {
    const chat = await this.chatRep.findOne({ where: { id: msg.chatId } });
    chat.messages = [...chat.messages, msg.msg];
    this.chatRep.update(msg.chatId, chat);
  }

  async getMsgsFrom(chatId: number) {
    const chat = await this.chatRep.findOne({ where: { id: chatId } });
    return chat.messages;
  }

  async getChats(chatId: number[]) {
    return await this.chatRep.find({
      where: { idUsers: ArrayOverlap(chatId) },
    });
  }
}
