import { OnModuleInit } from "@nestjs/common";
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from "@nestjs/websockets";
import { Server } from "socket.io";


@WebSocketGateway(1234, {})
export class Gateway implements OnModuleInit{

    @WebSocketServer()
    server: Server

    onModuleInit() {
        this.server.on('connect', (socket) => {
            console.log(socket.id)
        })
    }

    @SubscribeMessage('events')
    handleEvent(@MessageBody() data: unknown) {
        console.log( data );
    }
}