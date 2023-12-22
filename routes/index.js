import { Router } from 'express';
import { errors } from 'celebrate';

import auth from '../middlewares/auth.js';
import ApiError from '../utils/ApiError.js';
import globalErrorHandler from '../utils/globalErrorHandler.js';
import { errorLogger, requestLogger } from '../middlewares/logger.js';
import { createUser, login } from '../controllers/users.js';
import userRouter from './users.js';
import movieRouter from './movies.js';
import userUpValidate from '../middlewares/userUpValidate.js';
import userInValidate from '../middlewares/userInValidate.js';

const router = Router();

router.use(requestLogger);

router.post('/signin', userInValidate, login);
router.post('/signup', userUpValidate, createUser);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.use('*', auth, (req, res, next) => {
  next(ApiError.NotFound('Страница не найдена'));
});

router.use(errorLogger);
router.use(errors());
router.use(globalErrorHandler);

export default router;
