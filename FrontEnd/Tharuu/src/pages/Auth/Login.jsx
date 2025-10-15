import React, { useState } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      setError('');
      
      await login({
        email: values.email,
        password: values.password
      });

      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FFF9F9]">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="grid w-full max-w-3xl gap-6 rounded-2xl bg-white/85 p-6 shadow-xl shadow-pink-100 lg:grid-cols-[1fr,1fr]">
          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-pink-600">
              Welcome back
            </span>
            <h1 className="font-serif text-3xl font-semibold text-slate-900">
              Your bridal journey starts here
            </h1>
            <p className="text-sm leading-relaxed text-slate-600">
              Access your bookings, explore couture collections, and chat with our stylists.
            </p>
            <div className="space-y-3 rounded-xl border border-pink-100 bg-white/75 p-4 text-sm text-slate-600">
              <p className="font-semibold text-pink-500">Need an account?</p>
              <p>
                Create a customer account to book appointments and access our services.
              </p>
              <a
                className="inline-flex w-fit items-center justify-center rounded-full bg-pink-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white shadow-md shadow-pink-200 transition hover:bg-pink-600"
                href="/register"
              >
                Create customer account
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-pink-100 bg-white/85 p-6 shadow-lg shadow-pink-100">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
              {({ errors, touched }) => (
                <Form className="space-y-4">
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
                      placeholder="••••••••"
                      className={`w-full rounded-xl border px-4 py-3 text-sm shadow-sm transition focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 ${
                        errors.password && touched.password ? 'border-red-400' : 'border-slate-200'
                      }`}
                    />
                    <ErrorMessage name="password" component="div" className="mt-2 text-xs font-medium text-red-500" />
                  </div>

                  {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <label className="flex items-center gap-2">
                      <Field type="checkbox" name="remember" className="h-4 w-4 rounded border-pink-200 text-pink-500 focus:ring-pink-200" />
                      Remember me
                    </label>
                    <a className="font-semibold text-pink-500 hover:text-pink-600" href="/forgot-password">
                      Forgot password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center rounded-xl bg-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-600 disabled:cursor-wait disabled:bg-pink-300"
                  >
                    {loading ? 'Signing you in…' : 'Log in'}
                  </button>

                  <p className="text-center text-xs text-slate-500">
                    New to Tharu Bridal Studio?{' '}
                    <a className="font-semibold text-pink-500 hover:text-pink-600" href="/register">
                      Create your profile
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

export default Login;
