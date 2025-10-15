import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';

const Register = () => {
  const navigate = useNavigate();
  const { register, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Password confirmation is required'),
    acceptTerms: Yup.boolean().oneOf([true], 'You must accept the terms')
  });

  const handleRegister = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      setError('');
      setSuccess(false);

      const result = await register({
        name: values.name,
        email: values.email,
        password: values.password,
        role: 'CUSTOMER' // Only customers can register
      });

      if (result.success) {
        setSuccess(true);
        // Redirect based on user role
        const roleRedirects = {
          'OWNER': '/dashboard/owner',
          'STAFF': '/dashboard/staff',
          'CUSTOMER': '/dashboard/customer'
        };

        setTimeout(() => {
          navigate(roleRedirects[result.user.role] || '/home', { replace: true });
        }, 2000);
      }
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  // Redirect if already logged in
  if (user) {
    const roleRedirects = {
      'OWNER': '/dashboard/owner',
      'STAFF': '/dashboard/staff',
      'CUSTOMER': '/dashboard/customer'
    };
    return <Navigate to={roleRedirects[user.role] || '/home'} replace />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FFF9F9]">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="grid w-full max-w-3xl gap-6 rounded-2xl bg-white/85 p-6 shadow-xl shadow-pink-100 lg:grid-cols-[1fr,1fr]">
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="inline-flex rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-pink-600">
                Join our circle
              </span>
              <h1 className="font-serif text-3xl font-semibold text-slate-900">
                Create your Tharu Bridal profile
              </h1>
              <p className="text-sm leading-relaxed text-slate-600">
                Create your customer account to book appointments and access our services.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-pink-100 bg-white/85 p-6 shadow-lg shadow-pink-100">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleRegister}>
              {({ errors, touched, isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Full Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      className={`w-full rounded-xl border px-4 py-3 text-sm shadow-sm transition focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 ${
                        errors.name && touched.name ? 'border-red-400' : 'border-slate-200'
                      }`}
                      placeholder="Your full name"
                    />
                    <ErrorMessage name="name" component="div" className="mt-2 text-xs font-medium text-red-500" />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Email address
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className={`w-full rounded-xl border px-4 py-3 text-sm shadow-sm transition focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 ${
                        errors.email && touched.email ? 'border-red-400' : 'border-slate-200'
                      }`}
                      placeholder="you@example.com"
                    />
                    <ErrorMessage name="email" component="div" className="mt-2 text-xs font-medium text-red-500" />
                  </div>

                  <div>
                    <label htmlFor="password" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Create a password"
                      className={`w-full rounded-xl border px-4 py-3 text-sm shadow-sm transition focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 ${
                        errors.password && touched.password ? 'border-red-400' : 'border-slate-200'
                      }`}
                    />
                    <ErrorMessage name="password" component="div" className="mt-2 text-xs font-medium text-red-500" />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Confirm password
                    </label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Repeat your password"
                      className={`w-full rounded-xl border px-4 py-3 text-sm shadow-sm transition focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 ${
                        errors.confirmPassword && touched.confirmPassword ? 'border-red-400' : 'border-slate-200'
                      }`}
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="mt-2 text-xs font-medium text-red-500" />
                  </div>

                  <div className="flex items-start gap-3">
                    <Field
                      id="acceptTerms"
                      name="acceptTerms"
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-pink-200 text-pink-500 focus:ring-pink-200"
                    />
                    <label htmlFor="acceptTerms" className="text-xs leading-relaxed text-slate-500">
                      I agree to the{' '}
                      <a className="font-semibold text-pink-500 hover:text-pink-600" href="/terms">
                        Terms & Conditions
                      </a>{' '}
                      and consent to receiving bridal inspiration emails.
                    </label>
                  </div>
                  <ErrorMessage name="acceptTerms" component="div" className="mt-1 text-xs font-medium text-red-500" />

                  {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                      Account created successfully! Redirecting to your dashboard...
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || success}
                    className="flex w-full items-center justify-center rounded-xl bg-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-600 disabled:cursor-wait disabled:bg-pink-300"
                  >
                    {isSubmitting ? 'Creating your profile…' : 'Create account'}
                  </button>

                  <p className="text-center text-xs text-slate-500">
                    Already have an account?{' '}
                    <a className="font-semibold text-pink-500 hover:text-pink-600" href="/login">
                      Log in here
                    </a>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
