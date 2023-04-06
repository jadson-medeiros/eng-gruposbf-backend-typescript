import Redis from 'ioredis';
import { promisify } from 'util';
import { env } from '@/config/env';

const redisClient = new Redis(env.REDIS_PORT, env.REDIS_HOST);

function getRedis(value: string) {
    const syncRedisGet = promisify(redisClient.get).bind(redisClient);
    return syncRedisGet(value);
}

function setRedis(key: string, value: string) {
    const syncRedisSet = promisify(redisClient.set).bind(redisClient);
    return syncRedisSet(key, value);
}

export { redisClient, getRedis, setRedis };

