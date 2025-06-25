import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnalyticsEventDocument = AnalyticsEvent & Document;

@Schema({ timestamps: true })
export class AnalyticsEvent {
  @Prop({ required: true, index: true })
  eventName: string; // e.g., 'user_registered', 'booking_confirmed'

  @Prop({ required: true, index: true })
  userId: string; // Can be a user ID or a session ID for anonymous users

  @Prop({ type: Object })
  payload: Record<string, any>; // Event-specific data

  @Prop()
  ipAddress: string;

  @Prop()
  userAgent: string;
}

export const AnalyticsEventSchema =
  SchemaFactory.createForClass(AnalyticsEvent);
