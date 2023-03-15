import {CreateTodoDto, GetTodoDto} from "../dtos/Todo";
import {create, get} from '../services/todo';
import {Request, Response} from "express";
import logger from '../utils/logger';

export async function createTodo(req: Request<{}, {}, CreateTodoDto["body"]>, res: Response) {
    try {
        const todo = await create(req.body, res.locals.user.id);
        res.status(200).json(todo);
    } catch (e: any) {
        logger.error(e);
        res.status(400).send(e.message);
    }
}

export async function getTodo(req: Request<GetTodoDto["params"]>, res: Response) {
    try {
        const todo = await get(parseInt(req.params.todoID), res.locals.user.id);
        res.status(200).json(todo);
    } catch (e: any) {
        logger.error(e);
        res.status(400).send(e.message);
    }
}