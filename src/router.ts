import http from 'http';
import {sendAns} from './helpers/sendAns'
import users from './data_base/users'
import {workLog} from './helpers/workLog'


 
export const router = (req:http.IncomingMessage,res:http.ServerResponse)=>{
	sendAns(res,users,200);
	workLog(req)
}