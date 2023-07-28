import process from 'process';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';

import getenv from './src/helpers/getenv.js';
import errorHandler from './src/middlewares/errorHandler.js';
import requestLogger from './src/middlewares/requestLogger.js';

import authRouter from './src/routes/authRoute.js';
import santriRouter from './src/routes/santriRoute.js';
import usersRouter from './src/routes/usersRoute.js';

const app = express();

const PORT = process.env.PORT;
const MONGO_URI = getenv('MONGO_URI');

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to mongodb'))
  .catch((err) => {
    console.error(`Can't connect to mongodb`);
    console.error(err);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ limits: 10 * 1024 * 1024 }));
app.use(express.static('public'));

app.use(requestLogger);

app.get('/', (req, res) => {
  res.send('halo dari kelompok 2');
});

app.use('/auth', authRouter);
app.use('/santri', santriRouter);
app.use('/users', usersRouter);

app.use(errorHandler);

app.listen(PORT, () => console.info(`Server running on ${PORT}`));
