export interface User {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
}

const users:User[] =[{
  id:'1',
  username: 'First User',
  age: 30,
  hobbies:["write code", 'Do nothing'],
},
{
  id:'2',
  username: 'Second User',
  age: 31,
  hobbies:[ 'Do nothing'],
}
];


export default users;