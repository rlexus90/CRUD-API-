export interface User {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
}

const users:User[] =[{
  id:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
  username: 'First User',
  age: 30,
  hobbies:["write code", 'Do nothing'],
},
{
  id:'1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
  username: 'Second User',
  age: 31,
  hobbies:[ 'Do nothing'],
}
];


export default users;