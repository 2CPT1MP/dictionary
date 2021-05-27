import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IdiomModule } from '../idiom/idiom.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/dictionary'),
    UserModule,
    AuthModule,
    IdiomModule,
  ],
})
export class AppModule {}
