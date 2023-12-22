import mongoose from 'mongoose';
import validator from 'validator';

const movieScheme = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, "поле 'country' не может быть пустым"],
    },
    director: {
      type: String,
      required: [true, "поле 'director' не может быть пустым"],
    },
    duration: {
      type: Number,
      required: [true, "поле 'duration' не может быть пустым"],
    },
    year: {
      type: String,
      required: [true, "поле 'year' не может быть пустым"],
    },
    description: {
      type: String,
      required: [true, "поле 'description' не может быть пустым"],
    },
    image: {
      type: String,
      required: [true, "поле 'image' не может быть пустым"],
      validator: {
        validator: (v) => validator.isURL(v),
        message: "Неправильный формат поля 'image'",
      },
    },
    trailerLink: {
      type: String,
      required: [true, "поле 'trailerLink' не может быть пустым"],
      validator: {
        validator: (v) => validator.isURL(v),
        message: "Неправильный формат поля 'trailerLink'",
      },
    },
    thumbnail: {
      type: String,
      required: [true, "поле 'thumbnail' не может быть пустым"],
      validator: {
        validator: (v) => validator.isURL(v),
        message: "Неправильный формат поля 'thumbnail'",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, "поле 'owner' не может быть пустым"],
    },
    movieId: {
      type: Number,
      required: [true, "поле 'movieId' не может быть пустым"],
    },
    nameRU: {
      type: String,
      required: [true, "поле 'nameRU' не может быть пустым"],
    },
    nameEN: {
      type: String,
      required: [true, "поле 'nameEN' не может быть пустым"],
    },
  },
  { versionKey: false, timestamps: true },
);

export default mongoose.model('movie', movieScheme);
