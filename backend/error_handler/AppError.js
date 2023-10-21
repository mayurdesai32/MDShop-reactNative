class AppError extends Error {
  constructor(message, status) {
    super(message);

    this.message = message;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;
