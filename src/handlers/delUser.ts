import http from 'http';
import { routeFn } from '../router';
// import users from '../data_base/users';
import DataBase from '../data_base/dataBase';
import { sendAns } from '../helpers/sendAns';
import { getId } from '../helpers/getId';
import { validateUid } from '../helpers/validteUid';

export const delUser: routeFn = (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  const id = getId(req.url);
  const isValid = validateUid(id);

  if (!isValid) {
    sendAns(req, res, 'Is not valid Uid', 400);
    return;
  }

  const index = DataBase.users.findIndex((user) => user.id === id);

  if (index === -1) {
    sendAns(req, res, 'User not found', 404);
  } else {
    DataBase.users.splice(index, 1);
    sendAns(req, res, '', 204);
  }
};
