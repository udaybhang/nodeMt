import { validationResult } from "express-validator";

export class GlobalMiddleware {
    constructor() {
        
    }
    static checkError(req, res, next) {
        const error = validationResult(req);
        console.log(error);
        if(!error.isEmpty()) {
            next(new Error(error.array()[0].msg))
        } else {
            next();
        }
    }
}