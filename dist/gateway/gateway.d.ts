import { OnModuleInit } from "@nestjs/common";
import { Server } from "socket.io";
export declare class Gateway implements OnModuleInit {
    server: Server;
    onModuleInit(): void;
    handleEvent(data: unknown): void;
}
