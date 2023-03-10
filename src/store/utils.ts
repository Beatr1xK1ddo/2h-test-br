export function* resolver<T>(promise: Promise<T>) {
    return (yield promise) as T;
}

export interface PromiseFulfilledResult<T> {
    status: "fulfilled" | "rejected";
    value: T;
}