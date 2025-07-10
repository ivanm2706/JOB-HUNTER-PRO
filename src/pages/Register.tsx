import { motion } from 'framer-motion';
import Icon from '../components/Icon';
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .trim('Name cannot be empty')
    .min(1, 'Name cannot be empty')
    .matches(/^[A-Z]/, 'Must start with a capital letter'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});

export default function Register() {
  const handleSubmit = (
    values: { name: string; email: string; password: string },
    actions: FormikHelpers<{ name: string; email: string; password: string }>,
  ) => {
    console.log('login values', values);
    // api request
    if (values.name === 'Ivan') {
      actions.setStatus({ success: 'Login successful!' });
    } else {
      actions.setStatus({ error: 'Invalid credentials' });
    }

    setTimeout(() => {
      actions.setStatus(null);
      actions.resetForm();
    }, 2000);
    actions.setSubmitting(false);
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
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form
              className="p-4 bg-white shadow rounded w-100"
              style={{ maxWidth: 400, margin: '0 auto' }}
            >
              <h3 className="text-center mb-4">Register</h3>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <Field name="name" type="text" className="form-control" />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>

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
                  {isSubmitting ? 'Submiting in...' : 'Submit'}
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

                <p>Alraady have an account?</p>
                <Link to="/login" className="text-info fw-bold">
                  Login
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
}
