import { Module } from '@nestjs/common';
import { IdiomController } from './idiom.controller';
import { IdiomService } from './idiom.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Idiom, IdiomSchema } from './idiom.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Idiom.name, schema: IdiomSchema }]),
  ],
  controllers: [IdiomController],
  providers: [IdiomService],
})
export class IdiomModule {}
