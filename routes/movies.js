import { Router } from 'express';
import {
  createMovie,
  deleteMovie,
  getAllMyMovies,
} from '../controllers/movies.js';
import movieIDValidate from '../middlewares/movieIDValidate.js';
import movieInfoValidate from '../middlewares/movieInfoValidate.js';

const movieRouter = Router();

movieRouter.get('/', getAllMyMovies);
movieRouter.post('/', movieInfoValidate, createMovie);
movieRouter.delete('/:movieId', movieIDValidate, deleteMovie);

export default movieRouter;
