import {Request, Response, NextFunction} from "express";
import {AnyZodObject} from "zod";
import logger from '../utils/logger';

const validate = function(dto: AnyZodObject) {
    return function(req: Request, res: Response, next: NextFunction) {
        try {
            dto.parse({
                body: req.body,
                params: req.params,
                query: req.query
            });

            next();
        } catch (e: any) {
            logger.error(e);
            res.status(400).send(e.message);
        }
    }
}

export default validate;