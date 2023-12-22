import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import Movie from '../models/Movie.js';
import ApiError from '../utils/ApiError.js';

export const getAllMyMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    return res.send(movies);
  } catch (err) {
    return next(new ApiError());
  }
};

export const createMovie = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = req.body;

    const newMovie = await new Movie({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner,
      movieId,
      nameRU,
      nameEN,
    });

    return res.status(StatusCodes.CREATED).send(await newMovie.save());
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(ApiError.BadRequest('Переданы неверные данные'));
    }
    return next(new ApiError());
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId).orFail();
    if (movie.owner.toString() !== req.user._id) {
      return next(ApiError.Forbidden('Этот фильм нельзя удалить'));
    }
    return Movie.deleteOne(movie).orFail().then(() => {
      res.send({ message: 'Фильм удалён' });
    });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(ApiError.BadRequest('Переданы неверные данные'));
    }
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      return next(ApiError.NotFound('Фильм не найден'));
    }
    return next(new ApiError());
  }
};
