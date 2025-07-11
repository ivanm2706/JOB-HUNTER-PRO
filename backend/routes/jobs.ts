import express from 'express';

const router = express.Router();

let jobs = [
  {
    id: 1,
    position: 'Frontend Developer',
    company: 'TechCorp',
    status: 'applied',
    createdAt: '2024-07-01',
  },
  {
    id: 2,
    position: 'UI/UX Designer',
    company: 'Designify',
    status: 'interview',
    createdAt: '2024-07-03',
  },
  {
    id: 3,
    position: 'Backend Developer',
    company: 'CodeBase',
    status: 'rejected',
    createdAt: '2024-07-05',
  },
  {
    id: 4,
    position: 'Frontend Developer',
    company: 'TechCorp',
    status: 'applied',
    createdAt: '2024-07-01',
  },
  {
    id: 5,
    position: 'UI/UX Designer',
    company: 'Designify',
    status: 'applied',
    createdAt: '2024-07-03',
  },
  {
    id: 6,
    position: 'Backend Developer',
    company: 'CodeBase',
    status: 'rejected',
    createdAt: '2024-07-05',
  },
];

router.get('/', (req, res) => {
  const simulateError = false;

  if (simulateError) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  res.status(200).json(jobs);
});

router.post('/', (req, res) => {
  const newJob = {
    ...req.body,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  };
  jobs.push(newJob);
  res.status(201).json(newJob);
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const newJob = req.body;

  const simulateError = false;

  if (simulateError) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  jobs = jobs.map((job) => (job.id === id ? { ...job, ...newJob } : job));

  res.status(200).json(newJob);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);

  const simulateError = false;

  if (simulateError) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  jobs = jobs.filter((j) => j.id !== id);
  res.status(204).json(id);
});

export default router;
