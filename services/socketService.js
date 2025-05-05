import { Server } from "socket.io";

let io;

export const initSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });
};

export const getSocket = () => {
    if (!io) {
        throw new Error("Socket not initialized. Call initSocket first.");
    }
    return io;
};