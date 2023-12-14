export {};
declare global {
    interface Array<T> {
        remove(value: T): Array<T>;
        group(count: number): Array<Array<T>>;
    }
}
