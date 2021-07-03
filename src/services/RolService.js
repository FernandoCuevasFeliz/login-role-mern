import { BAD_REQUEST } from 'http-status-codes';
import { Rol } from '../models/Role';

import { ErrorHandler } from '../errors/ErrorHandler';

export class RolService {
  static rolModel = Rol;

  static create = async (data) => {
    const rol = await this.rolModel.findOne({ name: data.name });

    if (rol) throw new ErrorHandler(BAD_REQUEST, 'Rol alaready exist!');

    const newRol = await this.rolModel.create(data);
    return newRol;
  };

  static delete = async () => {};
}
