import { Injectable, Logger } from '@nestjs/common';

// This is a simplified state enum for the circuit breaker
enum CircuitBreakerState {
  CLOSED,
  OPEN,
  HALF_OPEN,
}

@Injectable()
export class CircuitBreakerService {
  private readonly logger = new Logger(CircuitBreakerService.name);
  private state = CircuitBreakerState.CLOSED;
  private failures = 0;
  private readonly failureThreshold = 3;
  private readonly resetTimeout = 10000; // 10 seconds

  // In a real app, use a library like 'opossum'
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === CircuitBreakerState.OPEN) {
      this.logger.error('Circuit is OPEN. Call blocked.');
      throw new Error('CircuitBreakerIsOpen');
    }

    try {
      const result = await fn();
      this.reset();
      return result;
    } catch (error) {
      this.recordFailure();
      throw error;
    }
  }

  private recordFailure() {
    this.failures++;
    this.logger.warn(`Failure ${this.failures} recorded.`);
    if (this.failures >= this.failureThreshold) {
      this.trip();
    }
  }

  private trip() {
    this.logger.error(
      'Failure threshold reached. Tripping the circuit to OPEN.',
    );
    this.state = CircuitBreakerState.OPEN;
    setTimeout(() => this.halfOpen(), this.resetTimeout);
  }

  private halfOpen() {
    this.logger.log('Reset timeout elapsed. Setting circuit to HALF_OPEN.');
    this.state = CircuitBreakerState.HALF_OPEN;
  }

  private reset() {
    if (this.state !== CircuitBreakerState.CLOSED) {
      this.logger.log('Call successful. Resetting circuit to CLOSED.');
      this.failures = 0;
      this.state = CircuitBreakerState.CLOSED;
    }
  }
}
