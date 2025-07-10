import { Button } from 'react-bootstrap';
import Icon from '../components/Icon';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div
      className="d-flex justify-content-center align-items-center vh-100 bg-light text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-5 bg-white rounded shadow" style={{ maxWidth: 500, width: '100%' }}>
        <div className="d-flex flex-column align-items-center">
          <Icon />
          <h1 className="mt-3 mb-2">
            Welcome to <span className="text-info">Job Hunter Pro</span>
          </h1>
          <p className="lead mb-4">Track your job applications. Stay organized. Get hired.</p>
        </div>

        <div className="d-flex flex-column gap-3">
          <Link to="/dashboard">
            <Button variant="info" className="w-100">
              Go to Dashboard
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="light" className="w-100">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="light" className="w-100">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
