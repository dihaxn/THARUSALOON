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

  const initialValues = { name: '', email: '', password: '', confirmPassword: '' };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required')
  });

  const handleRegister = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      setError('');
      const result = await register({
        name: values.name,
        email: values.email,
        password: values.password,
        role: 'customer'
      });
      if (result.success) {
        navigate('/dashboard/customer', { replace: true });
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
      'owner': '/dashboard/owner',
      'staff': '/dashboard/staff',
      'customer': '/dashboard/customer'
    };
    return <Navigate to={roleRedirects[user.role] || '/home'} replace />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FFF9F9]">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl rounded-2xl bg-white/85 p-8 shadow-xl shadow-pink-100">
          <div className="mb-6 space-y-2">
            <span className="inline-flex rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-pink-600"> Join us </span>
            <h1 className="font-serif text-3xl font-semibold text-slate-900"> Create your account </h1>
            <p className="text-sm leading-relaxed text-slate-600"> Start booking services and manage your bridal journey. </p>
          </div>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleRegister}>
            {({ errors, touched }) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"> Full Name </label>
                  <Field type="text" name="name" id="name" className={`w-full rounded-xl border px-4 py-3 text-sm shadow-sm transition focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 ${ errors.name && touched.name ? 'border-red-400' : 'border-slate-200' }`} placeholder="Jane Doe" />
                  <ErrorMessage name="name" component="div" className="mt-2 text-xs font-medium text-red-500" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"> Email address </label>
                  <Field type="email" name="email" id="email" className={`w-full rounded-xl border px-4 py-3 text-sm shadow-sm transition focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 ${ errors.email && touched.email ? 'border-red-400' : 'border-slate-200' }`} placeholder="you@example.com" />
                  <ErrorMessage name="email" component="div" className="mt-2 text-xs font-medium text-red-500" />
                </div>
                <div>
                  <label htmlFor="password" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"> Password </label>
                  <Field type="password" name="password" id="password" placeholder="••••••••" className={`w-full rounded-xl border px-4 py-3 text-sm shadow-sm transition focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 ${ errors.password && touched.password ? 'border-red-400' : 'border-slate-200' }`} />
                  <ErrorMessage name="password" component="div" className="mt-2 text-xs font-medium text-red-500" />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"> Confirm Password </label>
                  <Field type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className={`w-full rounded-xl border px-4 py-3 text-sm shadow-sm transition focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 ${ errors.confirmPassword && touched.confirmPassword ? 'border-red-400' : 'border-slate-200' }`} />
                  <ErrorMessage name="confirmPassword" component="div" className="mt-2 text-xs font-medium text-red-500" />
                </div>
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}
                <button type="submit" disabled={loading} className="flex w-full items-center justify-center rounded-xl bg-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-600 disabled:cursor-wait disabled:bg-pink-300" >
                  {loading ? 'Creating account…' : 'Create account'}
                </button>
                <p className="text-center text-xs text-slate-500"> Already have an account?{' '} <a className="font-semibold text-pink-500 hover:text-pink-600" href="/login"> Sign in </a> </p>
              </Form>
            )}
          </Formik>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
