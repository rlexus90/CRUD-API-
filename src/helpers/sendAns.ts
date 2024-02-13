import http from 'http'
import { User } from '../data_base/users'

export type Data = User| User[]| string;

export const sendAns = (res:http.ServerResponse, data:Data, status:number) =>{
	res.writeHead(status,{ 'Content-Type': 'application/json' });
	res.end(JSON.stringify(data));
}