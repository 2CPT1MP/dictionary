import { Document } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

export type IdiomDocument = Idiom & Document;

@Schema()
export class Idiom {
  @Prop()
  idiom: string;

  @Prop()
  definition: string;

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

  @Prop({ default: 0 })
  likes: number;
}

export const IdiomSchema = SchemaFactory.createForClass(Idiom);
