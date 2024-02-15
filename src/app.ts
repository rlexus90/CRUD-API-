import dotenv from 'dotenv';
import http from 'http';
import {router} from './router'

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = http.createServer((req,res)=>{
router(req,res);

});





export class App{

	constructor(){
this.start();
	}
	
	start (){
		server.listen(PORT,()=> console.log(`Server start on PORT=${PORT}`))

	}
}