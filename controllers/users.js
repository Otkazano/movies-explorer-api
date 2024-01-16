import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import generateToken from '../utils/jwt.js';
import ApiError from '../utils/ApiError.js';
import { ERROR_CODE_DUPLICATE_MONGO, SALT_ROUNDS } from '../utils/constants.js';

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email })
      .select('+password')
      .orFail(() => {
        throw new Error('NotAutanticate');
      });
    const matched = await bcrypt.compare(String(password), user.password);
    if (!matched) {
      throw new Error('NotAutanticate');
    }
    const token = generateToken({ _id: user._id });
    return res.send({ token });
  } catch (err) {
    if (err.message === 'NotAutanticate') {
      return next(ApiError.Unauthorized('Неправильные почта или пароль'));
    }
    return next(ApiError());
  }
};

export const createUser = async (req, res, next) => {
  try {
    const newUser = await bcrypt
      .hash(req.body.password, SALT_ROUNDS)
      .then((hash) => User.create({ ...req.body, password: hash }));
    const token = generateToken({ _id: newUser._id });
    return res.status(StatusCodes.CREATED).send({
      email: newUser.email,
      name: newUser.name,
      _id: newUser._id,
      token,
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(ApiError.BadRequest('Переданы неверные данные'));
    }

    if (err.code === ERROR_CODE_DUPLICATE_MONGO) {
      return next(ApiError.Conflict('Пользователь уже существует'));
    }

    return next(new ApiError());
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    return res.status(StatusCodes.OK).send({
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(ApiError.BadRequest('Переданы неверные данные'));
    }
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      return next(ApiError.NotFound('Пользователь не найден'));
    }

    return next(new ApiError());
  }
};

export const updateInfoProfile = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const updatedInfo = await User.findByIdAndUpdate(
      req.user._id,
      { email, name },
      {
        new: true,
        runValidators: true,
      },
    ).orFail();
    return res.json({
      email: updatedInfo.email,
      name: updatedInfo.name,
    });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(ApiError.BadRequest('Переданы неверные данные'));
    }
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      return next(ApiError.NotFound('Пользователь не найден'));
    }

    return next(new ApiError());
  }
};
