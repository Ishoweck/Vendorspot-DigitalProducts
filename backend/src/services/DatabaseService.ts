import { PrismaClient } from "@prisma/client";

class DatabaseService {
  private static instance: PrismaClient;

  static getInstance(): PrismaClient {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new PrismaClient({
        log:
          process.env.NODE_ENV === "development"
            ? ["query", "error", "warn"]
            : ["error"],
      });
    }
    return DatabaseService.instance;
  }

  static async initialize(): Promise<void> {
    const prisma = DatabaseService.getInstance();
    await prisma.$connect();
  }

  static async disconnect(): Promise<void> {
    const prisma = DatabaseService.getInstance();
    await prisma.$disconnect();
  }
}

export { DatabaseService };
