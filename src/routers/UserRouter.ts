import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { GlobalMiddleware } from "../middlewares/GlobalMiddlewares";
import { UserValidators } from "../validators/UserValidators"; // direct export class

class UserRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.PostRoutes();
        this.getRoutes();
    }
    getRoutes() {
        this.router.get('/login', UserValidators.login() , UserController.login)
    }
    PostRoutes() {
        console.log('hi')
        this.router.post('/signUp', UserValidators.signUp(), GlobalMiddleware.checkError ,UserController.signUp) //UserController.signUp isme () nahi hai signUP ke aage kyoki ye  kuch array return nahi kar raha
    }
}

export default new UserRouter();