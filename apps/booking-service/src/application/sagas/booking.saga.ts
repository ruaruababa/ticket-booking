import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { BookingCreatedEvent } from '../../domain/events/booking-created.event';

@Injectable()
export class BookingSaga {
  @Saga()
  bookingCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(BookingCreatedEvent),
      mergeMap((event: BookingCreatedEvent) => {
        console.log(
          `Saga: BookingCreatedEvent received for booking ${event.bookingId}. Triggering payment.`,
        );
        // In a real application, you would return a command to be sent to the payment microservice.
        // For example: return of(new ProcessPaymentCommand(event.bookingId, event.userId, amount));
        // For now, we'll just log it and return an empty observable.
        return EMPTY;
      }),
    );
  };
}
