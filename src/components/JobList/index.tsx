import { Card, Button, Badge } from 'react-bootstrap';
import type { Job } from '../../types/JobType';

type Props = {
  jobs: Job[];
  onDeleteClick: (id: number) => void;
  setEditingJob: (job: Job) => void;
};

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

export default function JobList({ jobs, onDeleteClick, setEditingJob }: Props) {
  return (
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
              <p className="text-muted">Created: {new Date(job.createdAt).toLocaleDateString()}</p>
              <div className="d-flex gap-2">
                <Button variant="outline-info" size="sm" onClick={() => setEditingJob(job)}>
                  Edit
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => onDeleteClick(job.id)}>
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}
