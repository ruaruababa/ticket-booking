export declare class DistributedLockService {
    private readonly logger;
    private locks;
    acquire(key: string, timeout?: number): Promise<boolean>;
    release(key: string): Promise<void>;
}
