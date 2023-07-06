import { OnModuleInit } from "@nestjs/common";
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server } from "socket.io";


@WebSocketGateway({
    cors:{
        origin:true
    }
})
export class Gateway implements OnModuleInit, OnGatewayDisconnect{

    @WebSocketServer()
    server: Server

    onModuleInit() {
        this.server.on('connect', (socket) => {
            console.log("Hello", socket.id, "!")
        })
    }

    @SubscribeMessage('test')
    handleEvent() {
        console.log( "test is worked!" );
    }

    handleDisconnect(socket){
        console.log("Bye", socket.id, "!")
    }
}