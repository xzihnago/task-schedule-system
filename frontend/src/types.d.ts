export {};
declare global {
  var axios: typeof import("axios").default;
  var bootstrap: typeof import("bootstrap");

  interface APIResponseSuccess<T = unknown> {
    data: T;
  }
  interface APIResponseFailed<E = unknown> {
    error: E;
  }

  interface CommonError {
    name: string;
    message: string;
  }

  var year: string;
}
