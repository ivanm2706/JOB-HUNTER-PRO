/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from 'framer-motion';
import Icon from '../components/Icon';
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loginUser } from '../features/auth/authSlice';
import { useEffect } from 'react';
import isValideToken from '../utils/isValidToken';

const LoginSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});

export default function Login() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (isValideToken(token)) {
      navigate('/dashboard');
    }
  }, [navigate, token]);

  const handleSubmit = async (
    values: { email: string; password: string },
    actions: FormikHelpers<{ email: string; password: string }>,
  ) => {
    try {
      await dispatch(loginUser(values)).unwrap();

      navigate('/dashboard');
    } catch (e) {
      actions.setStatus({ error: 'Invalid credentials' });
    } finally {
      actions.setStatus(null);
      actions.resetForm();
      actions.setSubmitting(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, y: -30 }} // if <AnimatePresence>
      role="main"
      className="d-flex justify-content-center align-items-center vh-100 overflow-hidden"
    >
      <div>
        <div className="d-flex justify-content-center">
          <Icon />
        </div>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form
              className="p-4 bg-white shadow rounded w-100"
              style={{ maxWidth: 400, margin: '0 auto' }}
            >
              <h3 className="text-center mb-4">Login</h3>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <Field name="email" type="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              <div className="d-grid">
                <Button variant="info" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </div>

              {status?.success && (
                <div className="alert alert-success mt-3 text-center">{status.success}</div>
              )}

              {status?.error && (
                <div className="alert alert-danger mt-3 text-center">{status.error}</div>
              )}

              <div className="text-center mt-3">
                <hr></hr>

                <p>Don`t have an account?</p>
                <Link to="/register" className="text-info fw-bold">
                  Register
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
}
