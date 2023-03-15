import { Express } from 'express';
import {loginUser, registerUser} from '../controllers/user';
import validate from "../middlewares/validator";
import {userDto} from '../dtos/User';

function userRoutes(app: Express): void {
    app.post('/user/register', validate(userDto), registerUser);
    app.get('/user/login', validate(userDto), loginUser);
}

export default userRoutes;