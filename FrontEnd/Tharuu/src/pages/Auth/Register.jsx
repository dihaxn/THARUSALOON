import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';

const Register = () => {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('This is not a valid email.').required('This field is required!'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('This field is required!'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('This field is required!'),
    acceptTerms: Yup.boolean().oneOf([true], 'You must accept the terms')
  });

  const handleRegister = () => {
    setSuccessful(false);

    setTimeout(() => {
      setSuccessful(true);
      setMessage('Account created successfully (local mock)');
    }, 600);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FFF9F9]">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="grid w-full max-w-5xl gap-10 rounded-3xl bg-white/90 p-12 shadow-2xl shadow-pink-100 lg:grid-cols-2">
          <div className="flex flex-col justify-between space-y-10">
            <div className="space-y-3">
              <span className="inline-flex rounded-full bg-pink-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-pink-600">
                Join our circle
              </span>
              <h1 className="font-serif text-4xl font-semibold text-slate-900">
                Create your Tharu Bridal profile
              </h1>
              <p className="text-sm leading-relaxed text-slate-600">
                Build mood boards, save gown favorites, and collaborate with stylists to craft your bespoke bridal vision.
              </p>
            </div>
            <div className="space-y-4 rounded-2xl border border-pink-100 bg-white/70 p-6 text-sm text-slate-600">
              <p className="font-semibold text-pink-500">Member perks</p>
              <ul className="space-y-2">
                <li>• Personalized bridal style recommendations</li>
                <li>• Early access to new couture collections</li>
                <li>• Exclusive offers on pre-wedding treatments</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-pink-100 bg-white/80 p-8 shadow-xl shadow-pink-100">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleRegister}>
              {({ errors, touched, isSubmitting }) => (
                <Form className="space-y-5">
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

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center rounded-xl bg-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-600 disabled:cursor-wait disabled:bg-pink-300"
                  >
                    {isSubmitting ? 'Creating your profile…' : 'Create account'}
                  </button>

                  {message && (
                    <div
                      className={`rounded-xl border px-4 py-3 text-sm ${
                        successful
                          ? 'border-green-200 bg-green-50 text-green-600'
                          : 'border-red-200 bg-red-50 text-red-600'
                      }`}
                    >
                      {message}
                    </div>
                  )}

                  <p className="text-xs text-slate-500">
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
