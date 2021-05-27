import { Document } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { UserClass } from '../user/user.schema';

export type IdiomDocument = Idiom & Document;

@Schema()
export class Idiom {
  @Prop()
  idiom: string;

  @Prop()
  definition: string;

  @Prop({ type: Date, default: Date.now() })
  timestamp: string;

  @Prop({ type: [String] })
  keywords: string[];

  @Prop()
  category: string;

  @Prop()
  source: string;

  @Prop()
  quote: string;

  @Prop()
  field: string;

  @Prop({ default: false })
  approved: boolean;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'users' })
  likes: UserClass[];
}

export const IdiomSchema = SchemaFactory.createForClass(Idiom);
