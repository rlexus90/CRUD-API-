import http from 'http'

export const workLog = (req:http.IncomingMessage)=>{
	console.log(`${req.method}: ${req.url}`);
}

