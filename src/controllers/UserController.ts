import * as Jwt from 'jsonwebtoken';
import Users from "../models/Users"; //export default model('registers', userSchema); bethought class
import { Utils } from "../utils/Utils"; // simple export class

export class UserController {
    constructor() {
        
    }
    static async signUp(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const address = req.body.address;
        const confirm_password = req.body.confirm_password;
        const hash = await Utils.encryptPassword(password);
        const data = {
            email: email,
            password: hash,
            first_name: first_name,
            last_name: last_name,
            confirm_password: confirm_password,
            address: address,
            created_at: new Date(),
            updated_at: new Date()
        };
        try {
            if(password !== confirm_password) {
                throw new Error('Password confirmation does not match password');
            }
            let user = await new Users(data).save();
            res.send(user);
        } catch (e) {
            next(e);
        }
    }
  static async listUser(req: any, res: any, next) {
        try {
            let user = await Users.find();
            res.send(user);
        } catch (e) {
            next(e);
        }
  }
    
    static async login(req: any, res: any, next) {
        const password = req.query.password;
           const user = req.user; 
            try {
               await Utils.comparePassword({plainPassword: password, encryptedPassword: user.password});
               const token = Jwt.sign({
                email: user.email,
                _id: user._id
               }, 'secret', {expiresIn: '120d'}) 
               const data = {token: token, user: user}
               res.json(data);
            } catch (e) {
              next(e)  ;
            }
    }
}