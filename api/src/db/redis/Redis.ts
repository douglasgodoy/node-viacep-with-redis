import { createClient, RedisClient } from 'redis'
import { IRedis } from '../../interfaces/IRedis'

class Redis implements IRedis {
    async connect(): Promise<RedisClient> {
        const redis = createClient({
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT)
        });

        await new Promise((resolve): void => {
            redis.on('connect', () => { this.connected(); resolve('ok') })
            redis.on('error', this.errorConnection)
            redis.on('end', this.endConnection)
        })

        return redis
    }

    connected(): void {
        console.log(`redis connected at ${process.env.REDIS_HOST}`);
    }

    errorConnection(): void {
        console.log('error connect at redis');
    }

    endConnection(): void {
        console.log('redis client disconnected');

    }

    /* setCep(address: IAddress): string {
         const { cep } = address
         const duplicate = this.redis.exists(cep);
         if (!duplicate) this.redis.set(cep, JSON.stringify(address))
         return 'ok'
     }
 
     getCep({ cep }: any): boolean | string {
         if (!this.redis.exists(cep)) return false;
         return this.redis.get(cep);
     }
 */

}



export default Redis