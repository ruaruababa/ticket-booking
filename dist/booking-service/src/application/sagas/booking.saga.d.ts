import { ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
export declare class BookingSaga {
    bookingCreated: (events$: Observable<any>) => Observable<ICommand>;
}
