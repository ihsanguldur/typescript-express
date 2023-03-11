global.env = process.env.env || "development";

import app from '../app';
import Debug from 'debug';
import http from 'http';
import logger from '../utils/logger';
const debug = Debug('typescript-express:server');

import AppDataSource from '../entities';

const port = normalizePort(process.env.PORT || "8080");
app.set('port', port);

const server = http.createServer(app);

AppDataSource.initialize()
    .then(() => {
        logger.info("DB Connection has been established successfully.");
        server.listen(port, function () {
            logger.info(`App started on ${env} and listening port ${port}`);
        });
    })
    .catch((e) => {
        logger.error(e);
    });


server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val: string): string | number | false {
    const port = parseInt(val, 10);

    if(isNaN(port)) {
        return val;
    }

    if(port >= 0) {
        return port;
    }

    return false;
}

function onError(error: any): void {
    console.log("error",error);
    if(error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port

    switch(error.code) {
        case 'EACCES':
            logger.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(): void {
    const addr = server.address();
    const bind = typeof addr === "string"
        ? "Pipe " + addr
        : "Port " + addr?.port;
    debug('Listening on ' + bind);
}