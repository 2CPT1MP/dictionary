import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserClass, UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserClass.name, schema: UserSchema }]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
