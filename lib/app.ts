import * as express from "express";
import * as bodyParser from "body-parser";
import { UserRoutes } from "./routes/userRouter";
import * as mongoose from "mongoose";

class App {

    public app: express.Application = express();
    public routePrv: UserRoutes = new UserRoutes();
    public mongoUrl: string = 'mongodb://localhost/test';

    constructor() {
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);  
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static('public'));
        this.app.set('superSecret', '1029384756');
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, {useNewUrlParser: true});        
    }

}

export default new App().app;
