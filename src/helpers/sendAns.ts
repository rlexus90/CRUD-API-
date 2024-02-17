import http from 'http'
import { User } from '../data_base/users'
import { workLog } from './workLog';

export type Data = User| User[]| string;

export const sendAns = (req:http.IncomingMessage,res:http.ServerResponse, data:Data, status:number) =>{
	res.writeHead(status,{ 'Content-Type': 'application/json' });
	res.end(JSON.stringify(data));
	workLog(req,status);
}