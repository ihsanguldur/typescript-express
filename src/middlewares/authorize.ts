import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from "express";

const protect = function(req: Request, res: Response, next: NextFunction) {
    try {
        const authorization = req.headers.authorization;
        if(typeof authorization === "undefined") {
            return res.status(401).send("unauthorized.");
        }

        let tokenString: string;
        const parsedToken = authorization.split(" ");
        if(parsedToken.length == 2) {
            tokenString = parsedToken[1];
        } else {
            tokenString = parsedToken[0];
        }

        jwt.verify(tokenString, 'private', function(err, decoded) {
            if(err) {
                return res.status(401).json({err: err});
            }

            res.locals.user = decoded;
        });

        next();
    } catch (e: any) {
        console.log(e);
        res.status(400).send(e.message);
    }

}

export default protect;