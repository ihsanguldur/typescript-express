import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from 'config';
import {User} from './User';
import * as fs from "fs";
import path from "path";
//for migration
let env = "development";

function getEntities(): any[] {
    let entities: any[] = [];
    const basename = path.basename(__filename);
    fs
        .readdirSync(__dirname)
        .filter(file => {
            return (
                file.indexOf('.') !== 0 &&
                file !== basename &&
                (file.slice(-3) === '.ts' || file.slice(-3) === '.js') &&
                (file.indexOf('.test.ts') === -1 || file.indexOf('.test.js') === -1)
            );
        })
        .forEach(file => {
            let entity = require(path.join(__dirname, file));
            entities.push(entity[Object.keys(entity)[0]]);
        });
    return entities;
}

function getMigrations(): any[] {
    let migrations: any[] = [];

    fs
        .readdirSync(path.join(__dirname, '../migrations'))
        .filter(file => {
            return (
                file.indexOf('.') !== 0 &&
                (file.slice(-3) === '.ts' || file.slice(-3) === '.js') &&
                (file.indexOf('.test.ts') === -1 || file.indexOf('.test.js') === -1)
            );
        })
        .forEach(file => {
            let migration = require(path.join(__dirname,'../migrations', file));
            migrations.push(migration[Object.keys(migration)[0]]);
        });
    return migrations;
}

const AppDataSource = new DataSource({
    type: config.get<"postgres">(`${env}.dialect`),
    host: config.get<string>(`${env}.host`),
    port: config.get<number>(`${env}.port`),
    username: config.get<string>(`${env}.username`),
    password: config.get<string>(`${env}.password`),
    database: config.get<string>(`${env}.database`),
    //synchronize: true,
    logging: env === "development",
    entities: getEntities(),
    migrations: getMigrations(),
    migrationsRun: true,
});

export default AppDataSource;