import { OK } from 'http-status-codes';
import { UserService } from '../services/UserService';

export class UserController {
  static getUsers = async (req, res) => {
    const users = await UserService.getAll();

    return res.status(OK).json({
      state: OK,
      data: users,
    });
  };
  static getUser = async (req, res) => {};

  static updateUser = async (req, res) => {};
  static updateRoleUser = async (req, res) => {};
  static updatePasswordUser = async (req, res) => {};
  static deleteUser = async (req, res) => {};
}
