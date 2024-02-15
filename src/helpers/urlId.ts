export const checkId = (url:string)=>{
	const urlArr = url.split('/').filter((el)=> el)
	const haveId = urlArr.length == 3;
	const headUrl = urlArr.slice(0,-1).join('/');
	return haveId ? `${headUrl}/{userId}` : `${urlArr.join('/')}`;
}