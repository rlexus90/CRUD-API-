import http from 'http';
import { routeFn } from '../router';
// import users from '../data_base/users';
import DataBase from '../data_base/dataBase';
import { sendAns } from '../helpers/sendAns';

export const getAll: routeFn = (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  sendAns(req, res, DataBase.users, 200);
};
