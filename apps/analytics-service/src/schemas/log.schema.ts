import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LogDocument = Log & Document;

@Schema({ timestamps: true })
export class Log {
  @Prop({ required: true })
  level: string; // e.g., 'error', 'warn', 'info', 'debug'

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  context: string; // e.g., 'UserService', 'BookingController'

  @Prop({ type: Object })
  metadata: Record<string, any>; // For extra data like stack trace, request id, etc.
}

export const LogSchema = SchemaFactory.createForClass(Log);
