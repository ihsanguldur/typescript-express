import {Express} from 'express';
import userRoutes from './user';
import todoRoutes from './todo';

function setupRoutes(app: Express): void {
    userRoutes(app);
    todoRoutes(app);
}

export default setupRoutes;