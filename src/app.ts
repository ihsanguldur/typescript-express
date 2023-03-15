import express, {Request, Response, NextFunction} from 'express';
import setupRoutes from './routes';
import logger from 'morgan';
import timeout from 'connect-timeout';
import createError from 'http-errors';

const app = express();

app.use(timeout('30s'));
app.use(logger('dev'));

app.use(express.json());

app.use(haltOnTimedOut);

setupRoutes(app);

function haltOnTimedOut(req: Request, res: Response, next: NextFunction): void {
    if(!req.timedout) {
        next();
    }
}

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction): void {
    next(createError(404));
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction): void {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
});

export default app;