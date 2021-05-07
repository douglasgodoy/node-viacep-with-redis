import axios from "axios"
import { RedisClient } from "redis"
import { IHttpRequest } from "../interfaces/IHttp"

class Cep {
    async getAddress(req: IHttpRequest, redis: RedisClient): Promise<object> {
        try {
            const { cep } = req.body
            const getData:string = await new Promise((resolve, reject): void => {
                redis.get(cep, (err, res) => {
                    if (err) reject(err)
                    resolve(res)
                })
            })
           
            const setData = async (obj:object) =>  new Promise((resolve, reject): void => {
                redis.set(cep, JSON.stringify(obj), (err, res) => {
                    if (err) reject(err)
                    resolve(res)
                })
            })

            if (!getData) {
                const obj = await this.requestApi(cep)
                console.log(await setData(obj));
                return obj
            } 


            return JSON.parse(getData)
        } catch (error) {
            return new Error(`error in request: ${error}`)
        }
    }

    async requestApi(cep: string) {
        const response: { data: object } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        return response.data;
    }
}



export default Cep