/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Spinner, Toast } from 'react-bootstrap';
import { AnimatePresence, motion } from 'framer-motion';
import JobStats from '../components/JobStats';
import JobList from '../components/JobList';
import type { Job } from '../types/JobType';
import { useEffect, useState } from 'react';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import EditJobModal from '../components/EditJobModal';
import AddJobModal from '../components/AddJobModal/AddJobModal';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addJob, deleteJob, fetchJobs, updateJob } from '../features/jobs/jobsSlice';
import SearchFilterForm from '../components/SearchFilterForms';
import Footer from '../components/Footer';
import { filteredJobs } from '../utils/filteredJobs';
import Pagination from '../components/Pagination';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

type ToastType = {
  message: string;
  variant: 'danger' | 'success' | '';
  show: boolean;
};

const toastInit: ToastType = {
  message: '',
  variant: '',
  show: false,
};

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { jobs, loading, error } = useAppSelector((state) => state.jobs);
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [toast, setToast] = useState<ToastType>(toastInit);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  // delete
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  // add
  const [showAddModal, setShowAddModal] = useState(false);
  // edit
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const getAllJobs = () => {
    if (user) dispatch(fetchJobs());
  };
  useEffect(() => {
    getAllJobs();
  }, [dispatch, user]);

  const handleDeleteClick = (id: string) => {
    setSelectedJobId(id);
    setDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedJobId) return;

    setIsDeleting(true);

    dispatch(deleteJob(selectedJobId))
      .unwrap()
      .then(() => {
        setToast({
          message: 'Job deleted successfully!',
          variant: 'success',
          show: true,
        });

        getAllJobs();
      })
      .catch(() => {
        setToast({
          message: 'Failed to delete job. Try again.',
          variant: 'danger',
          show: true,
        });
      })
      .finally(() => {
        setDeleteModal(false);
        setSelectedJobId('');
        setIsDeleting(false);
        setCurrentPage(1);
      });
  };

  const handleAddJobClick = () => {
    setShowAddModal(true);
  };

  const handleAddJob = async (job: Omit<Job, 'id' | 'createdAt'>) => {
    try {
      await dispatch(addJob(job))
        .unwrap()
        .then(() => {
          setToast({ message: 'New job added!', variant: 'success', show: true });
          getAllJobs();
        });
    } catch (e) {
      setToast({ message: 'Failed to add job', variant: 'danger', show: true });
    } finally {
      setShowAddModal(false);
    }
  };

  const handleSaveJob = async (updatedJob: Job) => {
    try {
      await dispatch(updateJob(updatedJob))
        .unwrap()
        .then(() => {
          setToast({ message: 'Job is updated!', variant: 'success', show: true });
        });
      getAllJobs();
    } catch (e) {
      setToast({ message: 'Failed to update job', variant: 'danger', show: true });
    } finally {
      setEditingJob(null);
    }
  };

  const jobsPerPage = 6;
  const filtered = filteredJobs(jobs, searchTerm, filterStatus);
  const totalPages = Math.ceil(filtered.length / jobsPerPage);
  const paginatedJobs = filtered.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSignOut = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <motion.div className="container py-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Your Jobs</h2>
        <Button disabled={loading} variant="info" onClick={handleAddJobClick}>
          + Add Job
        </Button>
      </div>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="info" />
        </div>
      ) : error ? (
        <div className="text-danger text-center">{error}</div>
      ) : (
        <>
          <JobStats jobs={jobs} />

          <SearchFilterForm
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            setSearchTerm={setSearchTerm}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <JobList
                jobs={paginatedJobs}
                onDeleteClick={handleDeleteClick}
                setEditingJob={setEditingJob}
              />
            </motion.div>
          </AnimatePresence>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </>
      )}

      <DeleteConfirmModal
        show={showDeleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        jobTitle={jobs.find((j) => j.id === selectedJobId)?.position || ''}
        isDeleting={isDeleting}
      />

      <AddJobModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddJob}
      />

      <EditJobModal
        show={!!editingJob}
        onClose={() => setEditingJob(null)}
        job={editingJob}
        onSave={handleSaveJob}
      />

      <Toast
        show={toast.show}
        onClose={() => setToast(toastInit)}
        delay={3000}
        autohide
        bg={toast.variant}
        className="position-fixed bottom-0 end-0 m-3 text-white"
      >
        <Toast.Body>{toast.message}</Toast.Body>
      </Toast>

      <Footer onSignOut={handleSignOut} />
    </motion.div>
  );
}
