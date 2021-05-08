import { Request, Response } from "restify";

export interface IRoutes {
    index(req: Request, res: Response): void,
    ping(req: Request, res: Response): void,
}
