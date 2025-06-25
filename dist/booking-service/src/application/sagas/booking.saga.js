"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingSaga = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const booking_created_event_1 = require("../../domain/events/booking-created.event");
let BookingSaga = class BookingSaga {
    constructor() {
        this.bookingCreated = (events$) => {
            return events$.pipe((0, cqrs_1.ofType)(booking_created_event_1.BookingCreatedEvent), (0, operators_1.mergeMap)((event) => {
                console.log(`Saga: BookingCreatedEvent received for booking ${event.bookingId}. Triggering payment.`);
                return rxjs_1.EMPTY;
            }));
        };
    }
};
exports.BookingSaga = BookingSaga;
__decorate([
    (0, cqrs_1.Saga)(),
    __metadata("design:type", Object)
], BookingSaga.prototype, "bookingCreated", void 0);
exports.BookingSaga = BookingSaga = __decorate([
    (0, common_1.Injectable)()
], BookingSaga);
//# sourceMappingURL=booking.saga.js.map