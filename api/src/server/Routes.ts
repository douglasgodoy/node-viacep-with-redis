import { Request, RequestHandler, Response, Server } from 'restify';

import { IHttpNext, IHttpRequest, IHttpResponse } from '../interfaces/IHttp'
import { IRoutes } from '../interfaces/IRoutes'
import { RedisClient } from 'redis';
import Cep from '../services/Cep';

class Routes implements IRoutes {
    public redis
    public cepService
    constructor(server: Server, redis: RedisClient) {
        this.redis = redis
        this.cepService = new Cep()
        server.get('/', this.index)
        server.post('/', async (req: Request, res: Response) => res.send(await this.cepService.getAddress(req.body, redis)))
        server.get('/ping', this.ping)
    }

    index(req: Request, res: Response): void {
        res.send({ hello: 'world' });
    }


    ping(req: Request, res: Response): void {
        console.log('pong');
        res.send({ pong: 'it worked!' })
    }
}

export default Routes