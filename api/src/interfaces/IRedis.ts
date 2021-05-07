import { RedisClient } from 'redis';
import { IAddress } from './IAddress'

export interface IRedis {
    connect(): Promise<RedisClient>
    connected():void
    errorConnection(): void
    endConnection(): void
    /*setCep(address: IAddress): string
    getCep(address: any): any*/
}