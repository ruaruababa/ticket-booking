export declare class CircuitBreakerService {
    private readonly logger;
    private state;
    private failures;
    private readonly failureThreshold;
    private readonly resetTimeout;
    execute<T>(fn: () => Promise<T>): Promise<T>;
    private recordFailure;
    private trip;
    private halfOpen;
    private reset;
}
