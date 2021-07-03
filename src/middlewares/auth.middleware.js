import { BAD_REQUEST } from 'http-status-codes';
import { ErrorHandler } from '../errors/ErrorHandler';
import { Jwt } from '../utils/jwt';

export const auth = (req, res) => {
  let token = req.headers['authorization'];

  if (!token) {
    next(new ErrorHandler(BAD_REQUEST, 'Token is required!'));
    return;
  }

  try {
    token = token.split(' ')[1];
    const payload = Jwt.veifyToken(token);
    req.user = payload.user;
    next();
  } catch (error) {
    next(new ErrorHandler(BAD_REQUEST, 'Invalid Token'));
  }
};
