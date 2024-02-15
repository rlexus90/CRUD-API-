import http from 'http';
import { routeFn } from '../router';
import users from '../data_base/users';
import { sendAns } from '../helpers/sendAns';
import { getId } from '../helpers/getId';
import { validateUid } from '../helpers/validteUid';

export const updateUser: routeFn = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  data: string
) => {
  const id = getId(req.url);
  const isValid = validateUid(id);

  if (!isValid) {
    sendAns(req, res, 'Is not valid Uid', 400);
    return;
  }

  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    sendAns(req, res, 'User not found', 404);
  } else {
    const userProp = JSON.parse(data);
    users[index] = { ...users[index], ...userProp };
    sendAns(req, res, 'User has updated', 200);
  }
};
