import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../role/role.enum';
import { Document } from 'mongoose';

export type UserDocument = UserClass & Document;

@Schema({ collection: 'users' })
export class UserClass {
  userId: string;
  _id: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ type: [String], default: [Role.User] })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(UserClass);
