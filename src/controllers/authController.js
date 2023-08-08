import bcrypt from 'bcrypt';
import generateAccessToken from '../helpers/auth/generateAccessToken.js';
import { successResponseBuilder } from '../helpers/responseBuilder.js';
import User from '../models/adminModel.js';

export const signupAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username,
      password: encryptedPassword,
      role: 'ADMIN',
    });

    const token = generateAccessToken({
      id: user._id,
      isAdmin: true,
    });

    res
      .status(201)
      .json(successResponseBuilder({ user: user, accessToken: token }));
  } catch (err) {
    if (err?.code === 11000) {
      next({
        message: `Another user with username ${err?.keyValue?.username} is already registered.`,
        stack: err.stack,
        statusCode: 409,
      });
      return;
    }
    if (['CastError', 'ValidationError'].includes(err?.username)) {
      next({
        message: err.message,
        stack: err.stack,
        statusCode: 400,
      });
      return;
    }
    next(err);
  }
};

export const signup = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: email.toLowerCase(),
      password: encryptedPassword,
      name,
    });

    const token = generateAccessToken({
      id: user._id,
      email,
      isAdmin: false,
    });

    res
      .status(201)
      .json(successResponseBuilder({ user: user, accessToken: token }));
  } catch (err) {
    if (err?.code === 11000) {
      next({
        message: `Another user with email ${err?.keyValue?.email} is already registered.`,
        stack: err.stack,
        statusCode: 409,
      });
      return;
    }
    if (['CastError', 'ValidationError'].includes(err?.name)) {
      next({
        message: err.message,
        stack: err.stack,
        statusCode: 400,
      });
      return;
    }
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      next({
        message: 'masukkan username dan password',
        statusCode: 400,
      });
      return;
    }

    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      next({
        message: 'invalid credentials',
        statusCode: 401,
      });
      return;
    }

    const token = generateAccessToken({
      id: user._id,
      username,
      isAdmin: user.role === 'ADMIN',
    });

    res
      .status(200)
      .json(successResponseBuilder({ user: user, accessToken: token }));
  } catch (err) {
    next(err);
  }
};

// export const signout = async (req, res, next) => {
//   try {
//     res.clearCookie('access_token').status(200).json(successResponseBuilder());
//   } catch (err) {
//     next(err);
//   }
// };
