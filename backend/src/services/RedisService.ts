import redis from "redis";
import { config } from "@/config/config";

class RedisService {
  private static client: redis.RedisClientType;

  static async initialize(): Promise<void> {
    this.client = redis.createClient({
      url: config.redisUrl,
    });

    await this.client.connect();
  }

  static getClient(): redis.RedisClientType {
    return this.client;
  }
}

export { RedisService };
