import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import MsgSendDto from './dto/msgSend.dto';
import { ChatService } from './chat.service';
import { ChatCreateDto } from './dto/chatCreate.dto';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private chatService: ChatService, // private readonly userService: UserService, // private readonly friendService: FriendService, // private readonly chatService: ChatService,
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(socket) {
    console.log('Hello', socket.id, '!');
    // const messages = await this.chatService.getMsgs();
    // this.server.emit('store msgs', this.msgs);
  }

  handleDisconnect(socket) {
    console.log('Bye', socket.id, '!');
  }

  @SubscribeMessage('test')
  handleEvent() {
    console.log('test is worked!');
  }

  @SubscribeMessage('get messages')
  async getMessages(@MessageBody() id: number) {
    const messages = await this.chatService.getMsgsFrom(id);
    this.server.emit('store msgs', messages);
  }

  @SubscribeMessage('get store msgs')
  async getStoreMsgsEvent(@MessageBody() id: number, idChat: number) {
    const messages = await this.chatService.getMsgsFrom(idChat);
    this.server.emit(`take store msgs ${id}`, messages);
  }

  @SubscribeMessage('new message')
  async newMessageEvent(@MessageBody() msg: MsgSendDto) {
    await this.chatService.sendMsg(msg);
    this.server.emit('new message', msg);
  }
  //authenticateEvent
  // @SubscribeMessage('authenticate')
  // authenticateEvent(@MessageBody() msg: MsgSendDto) {
  //   this.server.emit('new message', msg);
  //   this.msgs.push(msg);
  // }
  @SubscribeMessage('send msg')
  async sendMsgEvent(@MessageBody() msg: MsgSendDto) {
    await this.chatService.sendMsg(msg);
    this.server.emit('new message', msg);
  }

  @SubscribeMessage('create chat')
  async createChat(@MessageBody() chatDto: ChatCreateDto) {
    await this.chatService.createChat(chatDto.idCreator);
    const chats = await this.getChats(chatDto);
    this.server.emit('give chats', chats);
  }

  @SubscribeMessage('get chats')
  async getChats(@MessageBody() chatDto: ChatCreateDto) {
    const chats = await this.chatService.getChats([chatDto.idCreator]);
    this.server.emit('new message', chats);
  }
}
