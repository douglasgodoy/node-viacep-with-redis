require('dotenv').config()
import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { RedisClient } from 'redis'
import Redis from './db/redis/Redis'
import Routes from './server/Routes'

export default (async () => {

    const opts: RouteShorthandOptions = {
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        pong: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    }

    try {

        const app: FastifyInstance = await Fastify(opts)
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
