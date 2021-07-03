export class ErrorHandler extends Error {
  constructor(statusCode, message, trace = '') {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.stack = trace;
  }
}
