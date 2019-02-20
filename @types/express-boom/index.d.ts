import express = require('express');

declare global {
  namespace Express {
    interface Boom {
      badRequest(message?: string | string[]): void;
      notFound(message?: string | string[]): void;
      internal(message?: string | string[]): void;
      forbidden(message?: string | string[]): void;
      unauthorized(message?: string | string[]): void;
      // If there are other boom methods you need, go ahead and add em
    }

    export interface Response {
      boom: Boom;
    }
  }
}

declare namespace e {
  // Empty but to allow for consistent import syntax
}
declare function e(): express.RequestHandler;

export = e;
