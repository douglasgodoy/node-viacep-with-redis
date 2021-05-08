require('dotenv').config()
import { Server } from 'restify';
import * as restify from 'restify';
import { RedisClient } from 'redis'
import Redis from './db/redis/Redis'
import Routes from './server/Routes'

export default (async () => {

    try {
        const app: Server = restify.createServer();
        app.use(restify.plugins.queryParser());
        app.use(restify.plugins.bodyParser());


        const port = process.env.PORT || 3001
        const redis: RedisClient = await (new Redis()).connect()
        new Routes(app, redis)
        app.listen(port, () => {
            console.log(`Server is running in port ${port}`)
        })


    } catch (error) {
        return new Error(error)
    }
})()
