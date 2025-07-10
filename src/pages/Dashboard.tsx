import { useEffect, useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Job } from '../types/JobType';
import { mockJobs } from '../json/jobs';
import JobStats from '../components/JobStats';

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    setTimeout(() => setJobs(mockJobs), 500);
  }, []);

  const getStatusVariant = (status: Job['status']) => {
    switch (status) {
      case 'applied':
        return 'primary';
      case 'interview':
        return 'success';
      case 'rejected':
        return 'danger';
    }
  };

  return (
    <motion.div className="container py-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Your Jobs</h2>
        <Link to="/add">
          <Button variant="info">+ Add Job</Button>
        </Link>
      </div>

      <JobStats jobs={mockJobs} />

      <div className="row g-4">
        {jobs.map((job) => (
          <div key={job.id} className="col-md-4">
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title>{job.position}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                <Badge bg={getStatusVariant(job.status)} className="mb-3 text-uppercase">
                  {job.status}
                </Badge>
                <p className="text-muted">
                  Created: {new Date(job.createdAt).toLocaleDateString()}
                </p>
                <div className="d-flex gap-2">
                  <Link to={`/edit/${job.id}`}>
                    <Button variant="outline-info" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button variant="outline-danger" size="sm">
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
