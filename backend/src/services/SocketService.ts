import { Server } from "socket.io";

class SocketService {
  private static io: Server;

  static initialize(io: Server): void {
    this.io = io;

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  }

  static getIO(): Server {
    return this.io;
  }
}

export { SocketService };
