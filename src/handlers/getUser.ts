import http from 'http';
import { routeFn } from '../router';
// import users from '../data_base/users';
import DataBase from '../data_base/dataBase';
import { sendAns } from '../helpers/sendAns';
import { validateUid } from '../helpers/validteUid';
import {getId} from '../helpers/getId'

export const getUser: routeFn = (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  const id = getId(req.url);
  const isValid = validateUid(id);

  if (!isValid) {
    sendAns(req, res, 'Is not valid Uid', 400);
    return;
  }

  const user = DataBase.users.find((el) => el.id === id);
  user
    ? sendAns(req, res, user, 200)
    : sendAns(req, res, 'User not found', 404);
};

