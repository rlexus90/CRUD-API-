import http from 'http';
import { routeFn } from '../router';
import users from '../data_base/users';
import { sendAns } from '../helpers/sendAns';

export const getAll: routeFn = (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  sendAns(req, res, users, 200);
};
