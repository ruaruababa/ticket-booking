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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookingHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const booking_entity_1 = require("../../domain/entities/booking.entity");
const booking_repository_1 = require("../../domain/repositories/booking.repository");
const create_booking_command_1 = require("../commands/create-booking.command");
let CreateBookingHandler = class CreateBookingHandler {
    constructor(repository, publisher) {
        this.repository = repository;
        this.publisher = publisher;
    }
    async execute(command) {
        const { bookingId, userId, eventId } = command;
        const booking = this.publisher.mergeObjectContext(new booking_entity_1.Booking(bookingId, userId, eventId));
        booking.createBooking();
        await this.repository.save(booking);
        booking.commit();
        return { bookingId };
    }
};
exports.CreateBookingHandler = CreateBookingHandler;
exports.CreateBookingHandler = CreateBookingHandler = __decorate([
    (0, cqrs_1.CommandHandler)(create_booking_command_1.CreateBookingCommand),
    __param(0, (0, common_1.Inject)(booking_repository_1.BOOKING_REPOSITORY)),
    __metadata("design:paramtypes", [Object, cqrs_1.EventPublisher])
], CreateBookingHandler);
//# sourceMappingURL=create-booking.handler.js.map