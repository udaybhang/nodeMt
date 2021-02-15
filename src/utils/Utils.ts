import * as Bcrypt from 'bcrypt';
import { Hash } from 'crypto';
export class Utils {
    constructor() {
        
    }
    static encryptPassword(password: string): Promise<any> {
            return new Promise((resolve, reject) => {
                Bcrypt.hash(password, 10, (err, hash) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve (hash);
                    }
                })
            })
    }

    static async comparePassword(password: {plainPassword: string, encryptedPassword: string}): Promise<any> {
        new Promise(((resolve, reject)=>{
            Bcrypt.compare(password.plainPassword, password.encryptedPassword, ((err, isSame)=>{
                if(err) {
                    reject(err);
                } else if(!isSame) {
                    reject(new Error('User and password Does not match'));
                } else {
                    resolve(true);
                }
            }))
        }))
    }
}