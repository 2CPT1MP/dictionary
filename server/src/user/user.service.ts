import { Injectable } from '@nestjs/common';
import { UnregisteredUser } from '../auth/auth.service';
import { v4 as generateId } from 'uuid';
import { Role } from '../role/role.enum';

export type User = {
  userId: number;
  username: string;
  password: string;
  roles: Role[];
};

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'admin',
      password: '$2b$10$LAAV1GC3dt9Tj0ycQNoWy.l/Wov6uBTtrEsJlPNj56dJ.dTQ6HGTm', //admin
      roles: [Role.Admin],
    },
    {
      userId: 2,
      username: 'Maria',
      password: '$2b$10$O/LrC27lqnRqC5gimwuzw.AuQtjw83vl4zvqCTwxK8zeefosFltgO', //password
      roles: [Role.User],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async insert(user: UnregisteredUser): Promise<void> {
    const newUser = { ...user, userId: generateId(), roles: [] };
    this.users.push(newUser);
  }
}
