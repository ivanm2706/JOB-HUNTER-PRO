import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <motion.div
      className="d-flex flex-column justify-content-center align-items-center vh-100 text-center bg-light"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <p className="lead mb-4">Oops! The page you're looking for doesn't exist.</p>

      <Link to="/dashboard">
        <Button variant="info">Back to Dashboard</Button>
      </Link>
    </motion.div>
  );
}
