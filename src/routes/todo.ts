import { Express } from 'express';
import validator from "../middlewares/validator";
import {createTodoDto, getTodoDto} from "../dtos/Todo";
import protect from "../middlewares/authorize";
import {createTodo, getTodo} from "../controllers/todo";

function todoRoutes(app: Express): void {
    app.post('/todo/', [validator(createTodoDto), protect], createTodo);
    app.get('/todo/:todoID', [validator(getTodoDto), protect], getTodo);
}

export default todoRoutes;