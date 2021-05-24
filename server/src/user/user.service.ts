import { Injectable } from '@nestjs/common';
import { UnregisteredUser } from '../auth/auth.service';
import { v4 as generateId } from 'uuid';

export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'admin',
      password: '$2b$10$LAAV1GC3dt9Tj0ycQNoWy.l/Wov6uBTtrEsJlPNj56dJ.dTQ6HGTm', //admin
    },
    {
      userId: 2,
      username: 'Maria',
      password: '$2b$10$O/LrC27lqnRqC5gimwuzw.AuQtjw83vl4zvqCTwxK8zeefosFltgO', //password
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async insert(user: UnregisteredUser): Promise<void> {
    const newUser = { ...user, userId: generateId() };
    this.users.push(newUser);
  }
}
