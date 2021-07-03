import { check } from 'express-validator';

import { validate } from '../middlewares/validator.middleware';

const signIn = [
  check('firstname', 'firstname is required!').notEmpty().isLength({ min: 3 }),
  check('lastname', 'lastname is required!').notEmpty().isLength({ min: 3 }),
  check('username', 'username is required!').notEmpty().isLength({ min: 3 }),
  check('email', 'email is required!').isEmail(),
  check(
    'password',
    'the password must be at least six characters long'
  ).isLength({ min: 6 }),
];

const signUp = [
  check('username', 'username is required!').notEmpty(),
  check(
    'password',
    'the password must be at least six characters long'
  ).isLength({ min: 6 }),
];

export const signInValidator = validate(signIn);
export const signUpValidator = validate(signUp);
