import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IdiomModule } from '../idiom/idiom.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    IdiomModule,
    MongooseModule.forRoot('mongodb://localhost/dictionary'),
  ],
})
export class AppModule {}
