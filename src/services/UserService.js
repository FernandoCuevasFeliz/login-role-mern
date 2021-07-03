import { BAD_REQUEST, NOT_FOUND } from 'http-status-codes';

import { User } from '../models/User';
import { ErrorHandler } from '../errors/ErrorHandler';
import { encryptPassword, matchPassword } from '../utils/bcript';
import { Role } from '../models/Role';

import { rolRoot, rolUser } from '../config';

export class UserService {
  static userModel = User;

  static notFields = {
    password: 0,
    isVerified: 0,
    isActive: 0,
  };

  static getAll = async () => {
    const users = await this.userModel.find(
      {
        $and: [
          { isActive: true },
          { username: { $not: { $regex: 'fernando' } } },
        ],
      },
      this.notFields
    );
    return users;
  };

  static getOne = async (id) => {
    const user = await this.userModel.findById(
      { $and: [{ _id: id }, { isActive: true }] },
      this.notFields
    );

    return user;
  };

  static create = async (data) => {
    const user = await this.userModel.findOne({
      $or: [{ email: data.email }, { username: data.username }],
    });

    if (user) throw new ErrorHandler(BAD_REQUEST, 'user already exist!');

    const role = await Role.findOne({ name: rolUser });

    const newUser = await this.userModel.create({
      ...data,
      role: role._id,
      password: await encryptPassword(data.password),
    });

    const userData = {
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      displayname: newUser.displayname,
      email: newUser.email,
    };

    return userData;
  };

  static logIn = async (username, password) => {
    const user = await this.userModel.findOne({
      $and: [{ $or: [{ username }, { email: username }] }, { isActive: true }],
    });

    if (!user) throw new ErrorHandler(BAD_REQUEST, 'User is not exist');

    const isMatchPassword = await matchPassword(password, user.password);

    if (!isMatchPassword) {
      throw new ErrorHandler(BAD_REQUEST, 'username or password do not match');
    }

    return user;
  };

  static update = async (id, data) => {
    const user = await this.getOne(id);

    if (!user) throw new ErrorHandler(NOT_FOUND, 'user not found');

    const userUpdate = await this.userModel.findByIdAndUpdate(
      { _id: id },
      data,
      {
        new: true,
      }
    );

    return userUpdate;
  };

  static delete = async (id) => {
    const user = await this.getOne(id);

    if (!user) throw new ErrorHandler(NOT_FOUND, 'user not found');

    return await this.userModel.findByIdAndUpdate(
      { _id: id },
      {
        isActive: false,
      },
      { new: true }
    );
  };
}
