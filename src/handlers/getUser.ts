import http from 'http';
import { routeFn } from '../router';
import users from '../data_base/users';
import { sendAns } from '../helpers/sendAns';
import { validateUid } from '../helpers/validteUid';

export const getUser: routeFn = (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  const id = getId(req.url);
  const isValid = validateUid(id);

  if (!isValid) {
    sendAns(res, 'Is not valid Uid', 400);
    return;
  }

  const user = users.find((el) => el.id === id);
  user ? sendAns(res, user, 200) : sendAns(res, 'User not found', 404);
};

const getId = (url: string) => {
  const urlArr = url.split('/').filter((el) => el);
  return urlArr.slice(-1).join('');
};
