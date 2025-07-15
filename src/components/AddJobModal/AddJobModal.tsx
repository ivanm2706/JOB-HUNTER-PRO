import { Modal, Button, Form as BSForm } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import type { Job } from '../../types/JobType';
import { useAppSelector } from '../../app/hooks';

type Props = {
  show: boolean;
  onClose: () => void;
  onAdd: (newJob: Omit<Job, 'id' | 'createdAt'>) => void;
};

const AddJobSchema = Yup.object().shape({
  position: Yup.string().required('Position is required'),
  company: Yup.string().required('Company is required'),
  status: Yup.string().oneOf(['applied', 'interview', 'rejected']).required('Status is required'),
});

export default function AddJobModal({ show, onClose, onAdd }: Props) {
  const user = useAppSelector((state) => state.auth.user);

  const handleAddJob = async (values: Partial<Job>, actions: FormikHelpers<Partial<Job>>) => {
    const newJob: Omit<Job, 'id' | 'createdAt'> = {
      position: values.position || '',
      company: values.company || '',
      status: values.status as Job['status'],
      userId: user?.id || '',
    };

    try {
      await onAdd(newJob);
    } catch (e) {
      console.error(e);
    } finally {
      actions.resetForm();
      onClose();
      actions.setSubmitting(false);
    }
  };
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Job</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ position: '', company: '', status: 'applied' }}
        validationSchema={AddJobSchema}
        onSubmit={handleAddJob}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Body>
              <BSForm.Group className="mb-3">
                <BSForm.Label>Position</BSForm.Label>
                <Field name="position" className="form-control" />
                <ErrorMessage name="position" component="div" className="text-danger" />
              </BSForm.Group>

              <BSForm.Group className="mb-3">
                <BSForm.Label>Company</BSForm.Label>
                <Field name="company" className="form-control" />
                <ErrorMessage name="company" component="div" className="text-danger" />
              </BSForm.Group>

              <BSForm.Group className="mb-3">
                <BSForm.Label>Status</BSForm.Label>
                <Field as="select" name="status" className="form-select">
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="rejected">Rejected</option>
                </Field>
                <ErrorMessage name="status" component="div" className="text-danger" />
              </BSForm.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="info" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Job'}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
