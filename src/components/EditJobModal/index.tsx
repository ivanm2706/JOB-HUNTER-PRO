import { Modal, Button, Form as BSForm, Spinner } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import type { Job } from '../../types/JobType';

type Props = {
  show: boolean;
  onClose: () => void;
  job: Job;
  onSave: (updatedJob: Job) => void;
  isSaving: boolean;
};

const EditJobSchema = Yup.object().shape({
  position: Yup.string().required('Position is required'),
  company: Yup.string().required('Company is required'),
  status: Yup.string().oneOf(['applied', 'interview', 'rejected']).required('Status is required'),
});

export default function EditJobModal({ show, onClose, job, onSave, isSaving }: Props) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Job</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={job}
        validationSchema={EditJobSchema}
        onSubmit={(values) => {
          onSave(values);
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
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSaving ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Saving...
                  </>
                ) : (
                  'Save'
                )}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
