import { Button, Container } from 'react-bootstrap';

type Props = {
  onSignOut: () => void;
};

export default function Footer({ onSignOut }: Props) {
  return (
    <footer className="bg-light py-3 mt-5 border-top">
      <Container className="d-flex justify-content-between align-items-center">
        <span className="text-muted">© {new Date().getFullYear()} MyJobTracker</span>
        <Button variant="outline-danger" size="sm" onClick={onSignOut}>
          Sign Out
        </Button>
      </Container>
    </footer>
  );
}
