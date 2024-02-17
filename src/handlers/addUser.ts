import http from 'http';
import { routeFn } from '../router';
// import users from '../data_base/users';
import DataBase from '../data_base/dataBase';
import { sendAns } from '../helpers/sendAns';
import {v4} from 'uuid'

export const addUser: routeFn = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  data: string
) => {
  const user = JSON.parse(data);
if(  validateUser(user)){
	const id = v4();
	const newUser = {...user,id};
	DataBase.users.push(newUser);
sendAns(req, res,'User added',201);
} else {
	sendAns(req, res,'It is not valid User',400);
}
};

const validateUser = (user: unknown) => {
  const keys = Object.keys(user);
  return (
    keys.includes('username') &&
    keys.includes('age') &&
    keys.includes('hobbies')
  );
};
