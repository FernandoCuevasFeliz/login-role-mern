import { check } from 'express-validator';

import { validate } from '../middlewares/validator.middleware';

const updateUser = [
  check('firstname', 'firstname is required!').notEmpty().isLength({ min: 3 }),
  check('lastname', 'lastname is required!').notEmpty().isLength({ min: 3 }),
  check('username', 'username is required!').notEmpty().isLength({ min: 3 }),
  check('email', 'email is required!').isEmail(),
];

const updateRole = [
  check('role', 'role is required!').notEmpty(),
  check('idUser', 'idUser is required!').notEmpty(),
];

const updatePassword = [
  check('oldPassword', 'oldPassword is required!').notEmpty(),
  check('newPassword', 'newPassword is required!').notEmpty(),
];

const deleteUser = [check('idUser', 'idUser is required!').notEmpty()];

export const updateUserValidator = validate(updateUser);
export const updatePasswordValidator = validate(updatePassword);
export const updateRoleValidator = validate(updateRole);
export const deleteUserValidator = validate(deleteUser);
