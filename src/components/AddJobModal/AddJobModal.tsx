import { Modal, Button, Form as BSForm } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import type { Job } from '../../types/JobType';

type Props = {
  show: boolean;
  onClose: () => void;
  onAdd: (newJob: Job) => void;
};

const AddJobSchema = Yup.object().shape({
  position: Yup.string().required('Position is required'),
  company: Yup.string().required('Company is required'),
  status: Yup.string().oneOf(['applied', 'interview', 'rejected']).required('Status is required'),
});

export default function AddJobModal({ show, onClose, onAdd }: Props) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Job</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ position: '', company: '', status: 'applied' }}
        validationSchema={AddJobSchema}
        onSubmit={(values, actions) => {
          const newJob: Job = {
            id: +uuidv4(),
            position: values.position,
            company: values.company,
            status: values.status as Job['status'],
            createdAt: new Date().toISOString(),
          };
          onAdd(newJob);
          actions.resetForm();
          onClose();
        }}
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
