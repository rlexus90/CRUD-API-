import http from 'http';
import { getAll } from './handlers/getAll';
import { getUser } from './handlers/getUser';
import { addUser } from './handlers/addUser';

export type routeFn = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  data: string
) => void;

export interface IRoute {
  [metod: string]: routeFn;
}

export type Routes = Record<string, IRoute>;
const USERS = 'api/users';
const USERS_ID = 'api/users/{userId}';

export const routes: Routes = {
  [USERS]: {
    GET: getAll,
    POST: addUser,
  },
  [USERS_ID]: {
    GET: getUser,
    PUT: null,
    DELETE: null,
  },
};
