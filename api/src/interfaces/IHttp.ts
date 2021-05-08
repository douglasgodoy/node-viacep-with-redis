import { Next, Request, Response } from "restify";

export interface IHttpRequest {
    body: { cep: string }
}

export interface IHttpResponse {
    res: Response
}

export interface IHttpNext {
    res: Next
}