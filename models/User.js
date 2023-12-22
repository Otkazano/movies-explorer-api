import mongoose from 'mongoose';
import validator from 'validator';

const userScheme = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "поле 'email' не может быть пустым"],
      unique: true,
      validator: {
        validator: (v) => validator.isEmail(v),
        message: "Неправильный формат поля 'email'",
      },
    },
    password: {
      type: String,
      required: [true, "поле 'password' не может быть пустым"],
      minlength: 2,
      select: false,
    },
    name: {
      type: String,
      required: [true, "поле 'name' не может быть пустым"],
      minlength: 2,
      maxlength: 30,
    },
  },
  { versionKey: false, timestamps: true },
);

export default mongoose.model('user', userScheme);
