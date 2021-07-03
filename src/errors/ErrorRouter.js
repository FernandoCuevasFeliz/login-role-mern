import { Router } from 'express';

import { MongoError } from 'mongodb';
import { Error as MongooseError } from 'mongoose';
import { JsonWebTokenError } from 'jsonwebtoken';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status-codes';

import { ErrorHandler } from './ErrorHandler';

export const errorParse = (error, next) => {
  if (
    error instanceof MongoError ||
    error instanceof MongooseError.CastError ||
    error instanceof MongooseError.ValidationError ||
    error instanceof JsonWebTokenError
  ) {
    next(new ErrorHandler(BAD_REQUEST, error.message));
  }

  if (error instanceof ErrorHandler) {
    next(error);
  }

  console.log(error);
  next(new ErrorHandler(INTERNAL_SERVER_ERROR, 'Error Performing Action'));
};

export class ErrorRouter {
  _router = Router();

  constructor() {
    this.route.bind(this);
  }

  get router() {
    return this._router;
  }

  route(path) {
    const get = this.get.bind(this);
    const post = this.post.bind(this);
    const put = this.put.bind(this);
    const patch = this.patch.bind(this);
    const deleteA = this.delete.bind(this);

    return {
      get(...handlers) {
        get(path, ...handlers);
        return this;
      },
      post(...handlers) {
        post(path, ...handlers);
        return this;
      },
      put(...handlers) {
        put(path, ...handlers);
        return this;
      },
      patch(...handlers) {
        patch(path, ...handlers);
        return this;
      },
      delete(...handlers) {
        deleteA(path, ...handlers);
        return this;
      },
    };
  }

  get(path, ...handlers) {
    const handler = this.handlerException(handlers.pop());
    this.router.get(path, handlers, handler);
    return this;
  }

  post(path, ...handlers) {
    const handler = this.handlerException(handlers.pop());
    this.router.post(path, handlers, handler);
    return this;
  }
  put(path, ...handlers) {
    const handler = this.handlerException(handlers.pop());
    this.router.put(path, handlers, handler);
    return this;
  }
  patch(path, ...handlers) {
    const handler = this.handlerException(handlers.pop());
    this.router.patch(path, handlers, handler);
    return this;
  }
  delete(path, ...handlers) {
    const handler = this.handlerException(handlers.pop());
    this.router.delete(path, handlers, handler);
    return this;
  }

  handlerException(handler) {
    return (req, res, next) => {
      try {
        handler(req, res)?.catch((error) => {
          errorParse(error, next);
        });
      } catch (error) {
        errorParse(error, next);
      }
    };
  }
}
