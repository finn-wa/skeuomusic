export type PromiseResolver<T> = {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
};

export function createPromiseResolver<T = unknown>(): PromiseResolver<T> {
  let resolveRef: (value: T | PromiseLike<T>) => void;
  let rejectRef: (reason?: any) => void;
  const promise = new Promise<T>(function (resolve, reject) {
    resolveRef = resolve;
    rejectRef = reject;
  });
  return {
    promise,
    resolve: resolveRef!,
    reject: rejectRef!,
  };
}
