import express from 'express';
import cors from 'cors';
import jobsRouter from './routes/jobs';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/jobs', jobsRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
