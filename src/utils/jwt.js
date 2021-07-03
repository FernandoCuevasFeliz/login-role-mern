import jwt from 'jsonwebtoken';

import { secretKey, jwtExpiresIn } from '../config';

export class Jwt {
  static generateToken = (payload, expiresIn = jwtExpiresIn) => {
    const token = jwt.sign(payload, secretKey, {
      expiresIn,
    });

    return token;
  };

  static varifyToken = (token) => jwt.verify(token, secretKey);
}
