import { Modal, Button, Spinner } from 'react-bootstrap';

type DeleteConfirmModalProps = {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  jobTitle?: string;
  isDeleting: boolean;
};

export default function DeleteConfirmModal({
  show,
  onClose,
  onConfirm,
  jobTitle,
  isDeleting,
}: DeleteConfirmModalProps) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete
        <strong> {jobTitle ? `"${jobTitle}"` : 'this job'}?</strong>
        <br />
        This action cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={isDeleting}>
          {isDeleting ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Deleting...
            </>
          ) : (
            'Delete'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
