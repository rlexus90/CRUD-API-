import users from './users';
import { User } from './users';
import cluster from 'cluster';

 
 
export default class DataBase {

  static users: User[]= users;

  static set(data:User[]){
    DataBase.users = data;

    if(cluster.isPrimary){
      for (const work of Object.values(cluster.workers)){
        work.send(data);
      }
    }
  }

}
