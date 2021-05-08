import axios from "axios"
import { RedisClient } from "redis"


class Cep {
    async getAddress(req: { cep: string }, redis: RedisClient): Promise<object> {
        try {
            const { cep } = req

            if (!cep) return;
            const sanitizeCep = cep.match(/[0-9]/g).join("")
            if (sanitizeCep.length !== 8) return;


            const getData:string = await new Promise((resolve, reject): void => {
                redis.get(cep, (err, res) => {
                    if (err) reject(err)
                    if (res) console.log('cache!');
                    resolve(res)
                })
            })
           
            const setData = async (obj:object) =>  new Promise((resolve, reject): void => {
                redis.set(cep, JSON.stringify(obj), (err, res) => {
                    if (err) reject(err)
                    console.log('api!');
                    resolve(res)
                })
            })
            
            if (!getData) {
                const obj = await this.requestApi(cep)
                console.log(await setData(obj));
                return obj
            } 


            return { ...JSON.parse(getData), cache: true }
        } catch (error) {
            console.log(`error in request: ${error}`);
            return new Error(`error in request: ${error}`)
        }
    }

    async requestApi(cep: string) {
        const response: { data: object } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        return { ...response.data, cache: false };
    }
}



export default Cep