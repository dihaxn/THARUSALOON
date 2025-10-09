import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';

const Landing = () => {
  const navigate = useNavigate();
  const { register, user } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(false);

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
        role: 'CUSTOMER'
      });

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/dashboard/customer', { replace: true });
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
    return navigate(roleRedirects[user.role] || '/home', { replace: true });
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-pink-50 via-white to-pink-100">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <span className="inline-flex rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-pink-600 mb-6">
              Welcome to Tharu Bridal
            </span>
            <h1 className="font-serif text-5xl font-bold text-slate-900 mb-4">
              Your Dream Wedding Starts Here
            </h1>
            <p className="text-xl text-slate-600 max-w-lg mx-auto">
              Create your account to book appointments, explore our collections, and begin your bridal journey with our expert stylists.
            </p>
          </div>

          {/* Registration Form */}
          <div className="rounded-2xl border border-pink-200 bg-white/90 p-8 shadow-2xl shadow-pink-100">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-slate-900 mb-2">Create Your Account</h2>
              <p className="text-slate-600">Join thousands of happy brides who chose Tharu Bridal</p>
            </div>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleRegister}>
              {({ errors, touched, isSubmitting }) => (
                <Form className="space-y-5">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">
                      Full Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      className={`w-full rounded-lg border px-4 py-3 text-sm shadow-sm transition focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 ${
                        errors.name && touched.name ? 'border-red-400' : 'border-slate-200'
                      }`}
                      placeholder="Your full name"
                    />
                    <ErrorMessage name="name" component="div" className="mt-1 text-xs font-medium text-red-500" />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                      Email Address
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className={`w-full rounded-lg border px-4 py-3 text-sm shadow-sm transition focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 ${
                        errors.email && touched.email ? 'border-red-400' : 'border-slate-200'
                      }`}
                      placeholder="you@example.com"
                    />
                    <ErrorMessage name="email" component="div" className="mt-1 text-xs font-medium text-red-500" />
                  </div>

                  <div>
                    <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Create a secure password"
                      className={`w-full rounded-lg border px-4 py-3 text-sm shadow-sm transition focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 ${
                        errors.password && touched.password ? 'border-red-400' : 'border-slate-200'
                      }`}
                    />
                    <ErrorMessage name="password" component="div" className="mt-1 text-xs font-medium text-red-500" />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-slate-700">
                      Confirm Password
                    </label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Repeat your password"
                      className={`w-full rounded-lg border px-4 py-3 text-sm shadow-sm transition focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 ${
                        errors.confirmPassword && touched.confirmPassword ? 'border-red-400' : 'border-slate-200'
                      }`}
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-xs font-medium text-red-500" />
                  </div>

                  <div className="flex items-start gap-3">
                    <Field
                      id="acceptTerms"
                      name="acceptTerms"
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-pink-200 text-pink-500 focus:ring-pink-200"
                    />
                    <label htmlFor="acceptTerms" className="text-sm leading-relaxed text-slate-600">
                      I agree to the{' '}
                      <a className="font-semibold text-pink-500 hover:text-pink-600" href="/terms">
                        Terms & Conditions
                      </a>{' '}
                      and consent to receiving bridal inspiration emails.
                    </label>
                  </div>
                  <ErrorMessage name="acceptTerms" component="div" className="mt-1 text-xs font-medium text-red-500" />

                  {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                      Account created successfully! Redirecting to your dashboard...
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || success}
                    className="w-full flex items-center justify-center rounded-lg bg-pink-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-600 disabled:cursor-wait disabled:bg-pink-300"
                  >
                    {isSubmitting ? 'Creating your account...' : 'Create My Account'}
                  </button>

                  <div className="text-center">
                    <p className="text-sm text-slate-600">
                      Already have an account?{' '}
                      <a 
                        className="font-semibold text-pink-500 hover:text-pink-600 cursor-pointer"
                        onClick={() => navigate('/login')}
                      >
                        Sign in here
                      </a>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-pink-600 text-xl">👗</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Expert Styling</h3>
              <p className="text-sm text-slate-600">Professional bridal consultants to help you find your perfect look</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-pink-600 text-xl">📅</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Easy Booking</h3>
              <p className="text-sm text-slate-600">Schedule appointments and manage your bridal journey seamlessly</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-pink-600 text-xl">💎</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Premium Collection</h3>
              <p className="text-sm text-slate-600">Exclusive access to our curated bridal and beauty collections</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
