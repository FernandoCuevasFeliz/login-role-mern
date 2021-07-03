import { Role } from '../models/Role';
import { User } from '../models/User';
import { defaultUser, rolRoot, rolAdmin, rolUser } from '../config';
import { encryptPassword } from './bcript';

export const initilaizeSetup = async () => {
  const roles = await Role.find();

  if (roles.length === 0) {
    const roleRoot = await Role.create({ name: rolRoot });
    await Role.create({ name: rolAdmin });
    await Role.create({ name: rolUser });

    const newUser = await User.create({
      firstname: defaultUser.user,
      lastname: defaultUser.user,
      username: defaultUser.user,
      displayname: `${defaultUser.user} ${defaultUser.user}`,
      password: await encryptPassword(defaultUser.pass),
      role: roleRoot._id,
      email: defaultUser.email,
    });
    console.log('User Created!', newUser);
  }
};
