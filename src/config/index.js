import { config } from 'dotenv';
config();

const ENV = process.env;

export const port = ENV.PORT || 5000;

export const uri = ENV.MONGO_URI || 'mongodb://localhost/db_test';

export const secretKey = ENV.SECRET_KEY || 'helloiamsecretkey';

export const jwtExpiresIn = ENV.JWT_EXPIRESIN || '1h';

export const rolRoot = ENV.ROL_ROOT || 'root';
export const rolAdmin = ENV.ROL_ADMIN || 'admin';
export const rolUser = ENV.ROL_USER || 'user';

export const defaultUser = {
  user: ENV.USER,
  email: ENV.EMAIL,
  pass: ENV.PASSWORD,
};
