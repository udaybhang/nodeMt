
import { body, query } from "express-validator";
import Users from "../models/Users";

export class UserValidators {
    constructor() {
        
    }
    static signUp() {
        return [body('first_name', 'first name is required').isAlphanumeric(),
    body('last_name', 'last name is required').isAlphanumeric(),
body('email', 'email is required').isEmail(),
body('password', 'password is required').isAlphanumeric().isLength({min: 8, max: 20}).withMessage('password can be from 8-20 character').isString(),
body('confirm_password', 'confirm password isrequired').isAlphanumeric().isLength({min:8, max: 20}).withMessage('confirm password can be from 8-20 character').isString()]
    }

    static login() {
        return [query('email', 'email is required').isEmail().custom((email, {req})=>{
            return Users.findOne({email: email}).then(user=>{
                if(user) {
                    req.user = user;
                    return true;
                } else {
                    throw new Error('User does not exist');
                }
            })
        }),
    query('password', 'password is required').isAlphanumeric()]
    }
}