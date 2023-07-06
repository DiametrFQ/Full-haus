import { OnModuleInit } from "@nestjs/common";
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server } from "socket.io";


@WebSocketGateway(1234, {})
export class Gateway implements OnModuleInit, OnGatewayDisconnect{

    @WebSocketServer()
    server: Server

    onModuleInit() {
        this.server.on('connect', (socket) => {
            console.log("Hello", socket.id, "!")
        })
    }

    @SubscribeMessage('events')
    handleEvent(@MessageBody() data: unknown) {
        console.log( data );
    }

    handleDisconnect(socket){
        console.log("Bye", socket.id, "!")
    }
}