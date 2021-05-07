import { FastifyInstance } from 'fastify'
import { IHttpRequest } from '../interfaces/IHttp'
import { IRoutes } from '../interfaces/IRoutes'
import { RedisClient } from 'redis';
import Cep from '../services/Cep';

class Routes implements IRoutes {
    public redis
    public cepService
    constructor(server: FastifyInstance, redis: RedisClient) {
        this.redis = redis
        this.cepService = new Cep()

        server.get('/', this.index)
        server.post('/', (req: IHttpRequest) => this.cepService.getAddress(req, redis))
        server.get('/ping', this.ping)
    }

    async index(): Promise<object> {
        return { hello: 'world' }
    }


    async ping(): Promise<object> {
        console.log('pong');
        return { pong: 'it worked!' }
    }
}

export default Routes