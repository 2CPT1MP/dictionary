import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UnregisteredUser } from '../auth/auth.service';
import { Role } from '../role/role.enum';

import { UserClass, UserDocument } from './user.schema';

export type User = {
  userId: string;
  username: string;
  password: string;
  roles: Role[];
};

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserClass.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  findOne(username: string) {
    return new Promise<UserClass>(async (resolve) => {
      const user = await this.userModel.findOne({ username });
      resolve(user);
    });
  }

  async insert(user: UnregisteredUser): Promise<void> {
    const newUser = new this.userModel(user);
    await newUser.save();
  }
}
