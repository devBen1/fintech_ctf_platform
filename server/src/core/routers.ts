import * as express from 'express';

abstract class Routers {
    abstract initRouters(): any;
    public router = express.Router();
}

export default Routers;
