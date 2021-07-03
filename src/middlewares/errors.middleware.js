import { INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes';

export const handleNotFound = (req, res, next) => {
  const statusCode = NOT_FOUND;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    url: req.url,
  });
};

export const handleError = (error, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = error;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};
