import _ from 'lodash';
import Role from '../../models/Role.js';
import User from '../../models/User.js';

export const roleSeeder = async (roles) => {
  try {
    const roleArray = [];
    if (roles instanceof Array) {
      roles.forEach((role) => {
        roleArray.push({ name: role, slug: _.kebabCase(role) });
      });
    }
    const rolesCreated = await Role.insertMany(roleArray);
    return rolesCreated;
  } catch (error) {}
};
