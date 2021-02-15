import {Server} from './server'; //export class and import here
let server = new Server().app;
let port = 3002;
server.listen(port, ()=> {
    console.log('server is running');
})