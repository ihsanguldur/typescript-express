import {register, login} from '../services/user';
import {NextFunction, Request, Response} from 'express';
import {UserDto} from "../dtos/User";
import logger from "../utils/logger";
import generateToken from '../utils/generateToken';

export async function registerUser(req: Request<{}, {},UserDto["body"]>, res: Response) {
    try {
        const user = await register(req.body);
        res.status(200).json(user);
    } catch (e: any){
        logger.error(e);
        res.status(400).send(e.message);
    }
}

export async function loginUser(req: Request<{}, {}, UserDto["body"]>, res: Response, next: NextFunction) {
    try {
        const user = await login(req.body);

        if(user == null) {
            return res.status(204).json({
                "message": "user not found"
            });
        }

        const token = generateToken(user.id);

        res.status(200).json({
            "token": token
        });
    } catch (e: any) {
        logger.error(e);
        res.status(400).send(e.message);
    }
}