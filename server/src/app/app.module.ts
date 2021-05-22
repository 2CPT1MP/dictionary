import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IdiomModule } from '../idiom/idiom.module';

@Module({
  imports: [
    IdiomModule,
    MongooseModule.forRoot('mongodb://localhost/dictionary'),
  ],
})
export class AppModule {}
