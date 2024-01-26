import express from 'express';
import _ from 'lodash';
import ApiError, { ReasonPhrases, StatusCodes } from '../errors/ApiError.js';
import Role from '../models/Role.js';
import User from '../models/User.js';

const mainRouter = new express.Router();
// Add routes
mainRouter.get('/', async (req, res) => {
  return res.json({
    message: 'Welcome to Api Server ',
  });
});

mainRouter.get('/seeder', async (req, res, next) => {
  try {
    const { password } = req.query;
    if (!password) {
      return res
        .status(StatusCodes.OK)
        .json({ message: 'welcome TO seeder Route' });
    }
    if (password !== '123456') {
      throw new ApiError('Incorrect Password', StatusCodes.UNAUTHORIZED);
    }
    const roles = await Role.insertMany([
      { name: 'Admin', slug: _.kebabCase('Admin') },
      { name: 'User', slug: _.kebabCase('User') },
    ]);
    // const userRole = await Role.findOne({ slug: 'user' });
    // const users = await User.insertMany([
    //   {
    //     username: 'user',
    //     email: 'user@example.com',
    //     password: 'password',
    //     role: userRole._id,
    //   },
    // ]);

    return res.json({ roles: roles });
  } catch (error) {
    next(error);
  }
});

// routerName.post('/', SessionController.store);
// routerName.put('/', SessionController.store);
// routerName.delete('/', SessionController.store);

export default mainRouter;
