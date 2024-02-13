import http from 'http'

export const router = (req:http.IncomingMessage,res:http.ServerResponse)=>{
	res.end(JSON.stringify(req.headers))
}