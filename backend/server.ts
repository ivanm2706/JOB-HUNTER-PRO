import express from 'express';
import cors from 'cors';
import jobsRouter from './routes/jobs';
import authRouter from './routes/auth';
import mongoose from 'mongoose';

const app = express();
const PORT = 5000;

const MONGO_URL =
  'mongodb+srv://ivanmorhundev:w0Qsjc8i1VNCGAf3@cluster0.qbajljh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// import User from './models/User';
//   import Job from './models/Job';
mongoose
  .connect(MONGO_URL)
  .then(async () => {
    console.log('connected to mongoDB');
    // await User.deleteMany({});

    // await Job.deleteMany({});
    // console.log('Old jobs removed')
  })
  .catch((err) => console.log('error mongo: ', err));

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use('/api/jobs', jobsRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
