import http from 'http';
import {sendAns} from './helpers/sendAns'
import users from './data_base/users'
import {workLog} from './helpers/workLog'
import {checkId} from './helpers/urlId'

type routeFn = (req:http.IncomingMessage,res:http.ServerResponse,data:string)=>void;

export interface IRoute {
[metod:string]:routeFn;
}

export type Routes = Record<string,IRoute>;
const USERS ='api/users';
const USERS_ID=  'api/users/{userId}';

export const routes:Routes = {
	[USERS]:{
		GET: null,
		POST: null,
	},
	[USERS_ID]:{
		GET:null,
		PUT:null,
		DELETE:null,
	}
}
 
// export const router = (req:http.IncomingMessage,res:http.ServerResponse)=>{
// 	sendAns(res,users,200);
// 	workLog(req);

// 	console.log(checkId(req.url))
// }