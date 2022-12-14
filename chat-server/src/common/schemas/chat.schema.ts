import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {
  @Prop()
  sender: string;

  @Prop()
  recruitId: number;

  @Prop()
  content: string;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
