import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { createBooking, updateBooking } from '../../lib/api';

const BookingForm = ({ booking, onSave }) => {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const initialValues = {
    userId: user?.id || '',
    reference: booking?.reference || '',
    clientName: booking?.clientName || '',
    service: booking?.service || '',
    artist: booking?.artist || '',
    eventDate: booking?.eventDate || '',
    status: booking?.status || 'PENDING'
  };

  const validationSchema = Yup.object().shape({
    reference: Yup.string().required('Reference is required'),
    clientName: Yup.string().required('Client name is required'),
    service: Yup.string().required('Service is required'),
    artist: Yup.string().required('Artist is required'),
    eventDate: Yup.date().required('Event date is required'),
    status: Yup.string().required('Status is required')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      setError('');
      if (booking) {
        await updateBooking(booking.id, values, token);
      } else {
        await createBooking(values, token);
      }
      onSave();
    } catch (error) {
      setError(error.message || 'Failed to save booking.');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <Form>
          <div>
            <label htmlFor="reference">Reference</label>
            <Field type="text" name="reference" />
            <ErrorMessage name="reference" component="div" />
          </div>
          <div>
            <label htmlFor="clientName">Client Name</label>
            <Field type="text" name="clientName" />
            <ErrorMessage name="clientName" component="div" />
          </div>
          <div>
            <label htmlFor="service">Service</label>
            <Field type="text" name="service" />
            <ErrorMessage name="service" component="div" />
          </div>
          <div>
            <label htmlFor="artist">Artist</label>
            <Field type="text" name="artist" />
            <ErrorMessage name="artist" component="div" />
          </div>
          <div>
            <label htmlFor="eventDate">Event Date</label>
            <Field type="date" name="eventDate" />
            <ErrorMessage name="eventDate" component="div" />
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <Field as="select" name="status">
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="IN_REVIEW">In Review</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </Field>
            <ErrorMessage name="status" component="div" />
          </div>
          {error && <div>{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default BookingForm;