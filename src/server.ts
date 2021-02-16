import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import UserRouter from './routers/UserRouter'; //export default new UserRouter();
// import UserRouter from './routers/UserRouter';
export class Server {
    public app: express.Application = express();
    constructor() {
        this.setConfiguration();
        this.setRoute();
        this.handleErrors();
    }
    setRoute() {
        this.app.use('/api/user', UserRouter.router);
    }
    setConfiguration() {
        this.connectMongoDb();
        this.app.use(bodyParser.json());
        this.configureBodyParser();
        var cors = require('cors');
this.app.use(cors({origin: '*','exposedHeaders' : ['X-Total-Count','Content-Type']}));
      
    }
    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something went wrong',
                status_code: errorStatus

            })
        })
    }
    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({extended: false}))
    }
    connectMongoDb() {
              mongoose.connect('mongodb://localhost:27017/insurance_brokerage', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
           console.log('connected to the database');
       })
    }

   
}