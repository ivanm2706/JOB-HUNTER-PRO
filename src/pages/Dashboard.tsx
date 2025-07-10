import { Button, Toast } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { mockJobs } from '../json/jobs';
import JobStats from '../components/JobStats';
import JobList from '../components/JobList';
import type { Job } from '../types/JobType';
import { useEffect, useState } from 'react';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import EditJobModal from '../components/EditJobModal';
import AddJobModal from '../components/AddJobModal/AddJobModal';
import { Form } from 'react-bootstrap';

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState<'danger' | 'success' | ''>('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [editingJob, setEditingJob] = useState<Job | null>(null);

  useEffect(() => {
    setTimeout(() => setJobs(mockJobs), 500);
  }, []);

  const filteredJobs = () => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filterStatus ? job.status === filterStatus : true;

      return matchesSearch && matchesStatus;
    });
  };

  const handleAddJob = (job: Job) => {
    setJobs((prev) => [...prev, job]);
    setToastMessage('New job added!');
    setToastVariant('success');
    setShowToast(true);
  };

  const handleSaveJob = (updatedJob: Job) => {
    setIsSaving(true);

    setJobs((prev) => prev.map((job) => (job.id === updatedJob.id ? updatedJob : job)));
    setToastMessage('Job updated successfully!');
    setToastVariant('success');
    setShowToast(true);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedJobId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedJobId) {
      setIsDeleting(true);

      // эмуляция запроса
      setTimeout(() => {
        const shouldFail = Math.random() < 0.3; // 30% шанс ошибки

        if (shouldFail) {
          setToastMessage('Failed to delete job. Try again.');
          setToastVariant('danger');
          setShowToast(true);
          setIsDeleting(false);
          setShowModal(false);
          return;
        }

        // успех
        setJobs((prev) => prev.filter((job) => job.id !== +selectedJobId));
        setToastMessage('Job deleted successfully!');
        setToastVariant('success');
        setShowToast(true);
        setIsDeleting(false);
        setShowModal(false);
        setSelectedJobId(null);
      }, 1000);
    }
  };

  return (
    <motion.div className="container py-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Your Jobs</h2>
        <Button variant="info" onClick={() => setShowAddModal(true)}>
          + Add Job
        </Button>
      </div>

      <JobStats jobs={jobs} />

      <div className="row mb-4">
        <div className="col-md-6">
          <Form.Control
            type="text"
            placeholder="Search by company or position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="rejected">Rejected</option>
          </Form.Select>
        </div>
      </div>

      <JobList
        jobs={filteredJobs()}
        onDeleteClick={handleDeleteClick}
        setEditingJob={setEditingJob}
      />

      {selectedJobId && (
        <DeleteConfirmModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmDelete}
          jobTitle={jobs.find((j) => j.id === +selectedJobId)?.position || ''}
          isDeleting={isDeleting}
        />
      )}

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        bg={toastVariant}
        className="position-fixed bottom-0 end-0 m-3 text-white"
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>

      {editingJob && (
        <EditJobModal
          show={!!editingJob}
          onClose={() => setEditingJob(null)}
          job={editingJob}
          onSave={handleSaveJob}
          isSaving={isSaving}
        />
      )}

      <AddJobModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddJob}
      />
    </motion.div>
  );
}
