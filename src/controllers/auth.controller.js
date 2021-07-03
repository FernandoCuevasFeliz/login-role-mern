import { OK } from 'http-status-codes';

import { UserService } from '../services/UserService';
import { Jwt } from '../utils/jwt';

export class AuthController {
  static signIn = async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;

    const user = await UserService.create({
      firstname,
      lastname,
      displayname: `${firstname} ${lastname}`,
      username,
      email,
      password,
    });

    return res.status(OK).json({
      status: OK,
      data: Jwt.generateToken({ user: { id: user._id } }),
      message: 'User Created!',
    });
  };

  static signUp = async (req, res) => {
    const { username, password } = req.body;
    const user = await UserService.logIn(username, password);

    return res.status(OK).json({
      status: OK,
      data: Jwt.generateToken({ user: { id: user._id } }),
      message: 'User Logged!',
    });
  };
}
