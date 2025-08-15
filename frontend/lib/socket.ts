"use client";

import { io, Socket } from "socket.io-client";

class SocketService {
  private socket: Socket | null = null;
  private static instance: SocketService;

  private constructor() {}

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public connect(): void {
    if (typeof window !== "undefined" && !this.socket) {
      const serverUrl =
        process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
        "http://localhost:5000";

      this.socket = io(serverUrl, {
        transports: ["websocket", "polling"],
        timeout: 20000,
      });

      this.socket.on("connect", () => {
        console.log("Connected to server:", this.socket?.id);
      });

      this.socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });

      this.socket.on("connect_error", (error: unknown) => {
        console.error("Connection error:", error);
      });
    }
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public on(event: string, callback: (...args: any[]) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  public off(event: string, callback?: (...args: any[]) => void): void {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  public emit(event: string, data: any): void {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  public isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export default SocketService.getInstance();
