import express, { json } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

app.use(helmet());
app.use(limiter);
app.use(json());

async function startApp() {
  try {
    await mongoose
      .connect(DB_URL)
      .then(() => {
        console.log('Connected to database');
      })
      .catch((err) => {
        console.log('Error with connection to database', err);
      });
    // app.use(router)
    app.listen(PORT, () => {
      console.log('Server is working on port', PORT);
    });
  } catch (err) {
    console.log('Error with listening to server', err);
  }
}

startApp();
