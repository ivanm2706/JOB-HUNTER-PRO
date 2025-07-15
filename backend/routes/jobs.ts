/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import Job from '../models/Job';
import { auth } from '../middleware/auth';
import { AuthRequest } from '../types/AuthRequest';

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

router.get('/', auth, async (req: AuthRequest, res) => {
  try {
    const jobs = await Job.find({ userId: req.userId }).sort({ createdAt: -1 });
    const clientJobs = jobs.map(({ _id, userId, position, company, status, createdAt }) => {
      return {
        id: _id,
        userId,
        position,
        company,
        status,
        createdAt,
      };
    });
    res.status(200).json(clientJobs);
  } catch (err) {
    res.status(500).json({ messate: 'Error fetching jobs ' });
  }
});

router.post('/', auth, async (req: AuthRequest, res) => {
  const { position, company, status } = req.body;
  const userId = req.userId;

  if (!position || !company || !status || !userId) {
    return res.status(400).json({ message: 'Missing required fields ' });
  }

  try {
    const job = new Job({
      position,
      company,
      status,
      userId,
      createdAt: new Date().toISOString(),
    });
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create job' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Error updating job', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Job.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Job not found ' });
    }

    res.status(204).json(deleted);
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete job', err });
  }
});

export default router;
