import http from 'http'

export const workLog = (req:http.IncomingMessage, status:number)=>{
	console.log(`${req.method}: ${req.url} - \x1b[32m${status}\x1b[37m'`);
}

