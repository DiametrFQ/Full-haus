import { OnModuleInit } from "@nestjs/common";
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayDisconnect, OnGatewayConnection } from "@nestjs/websockets";
import { Server } from "socket.io";

interface Msg {
    user: string;
    userid: string;
    msg: string;
}

@WebSocketGateway()
export class Gateway implements OnGatewayConnection, OnGatewayDisconnect{

    @WebSocketServer()
    server: Server

    msgs: Msg[] = []

    handleConnection(socket){
        console.log("Hello", socket.id, "!")
        this.server.emit('store msgs', this.msgs)
    }

    handleDisconnect(socket){
        console.log("Bye", socket.id, "!")
    }

    @SubscribeMessage('test')
    handleEvent() {
        console.log( "test is worked!" );
    }

    @SubscribeMessage('new message')
    newMessageEvent(@MessageBody() msg: Msg) {
        this.server.emit('new message', msg)
        this.msgs.push(msg)
    }
}