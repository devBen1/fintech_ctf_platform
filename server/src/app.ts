import express from 'express';
import Routers from "./core/routers";
import { Application } from "express";
import cors from 'cors';
import helmet from 'helmet';
import http from "http";
import cookieParser from "cookie-parser";
import path from 'path';
// import dBConfig from "./config/database.config";
// import { Sequelize } from "sequelize-typescript";

class App {
    public readonly app: express.Application;
    private server!: http.Server;
    // private dataSource: Sequelize = new Sequelize(dBConfig);
    public port: number;
    private routers!: Routers[];
    private readonly routersCB: (app: App) => Routers[];
    public whitelist = [
        'http://localhost:3000', // not https
        'http://localhost:3001', // not https
        'https://fintechbrighterfutures.diaryofhackers.com', // must be https!
        'https://brighterfutures-server.herokuapp.com', // must be https!
        // 'http://<local IP>:<port>', // optional, LAN access
    ]

    get getApp(): Application {
        return this.app;
    }

    get getServer(): http.Server {
        return this.server;
    }

    // getDataSource() {
    //     return this.dataSource;
    // }

    constructor(callback: (app: App) => Routers[], port: number) {
        this.app = express();
        this.port = port;
        this.routersCB = callback;
    }

    public async init() {
        const corsOptions = {
            credentials: true,
            origin: (origin: any, callback: any) => {

                // `!origin` allows server-to-server requests (ie, localhost requests)
                if (!origin || this.whitelist.indexOf(origin) !== -1) {
                    callback(null, true)
                } else {
                    callback(new Error("Not allowed by CORS: " + origin))
                }
            },
            optionsSuccessStatus: 200
        }

        this.app.use(express.json());
        this.app.use(cors(corsOptions));
        this.app.use(cookieParser());
        this.app.use('/', express.static('./public'));
        // this.app.use(cookieParser("secret"));
        this.app.use(helmet());
        await this.initRouters();
    }

    private async initRouters() {
        // await this.dataSource.authenticate();
        this.routers = this.routersCB(this);
        this.routers.forEach((routes) => {
            this.app.use('/api/', routes.router);
        });
        this.app.get('/*', function (req, res) {
            res.sendFile(path.join(__dirname, '../public/index.html'), function (err) {
                if (err) {
                    res.status(500).send(err)
                }
            })
        })
    }

    public async close() {
        if (this.server) {
            this.server.close();
        }
    }

    public async listen() {
        this.server = this.app.listen(this.port, () => {
            console.log(`🚀 Server is running on port ${this.port}`);
        });

        return this.app;
    }
}

export default App;