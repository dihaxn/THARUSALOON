import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

const RegisterForm = () => {
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const initialValues = {
        email: "",
        password: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("This is not a valid email.")
            .required("This field is required!"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("This field is required!"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required("This field is required!"),
    });

    const handleRegister = (formValue) => {
        const { email, password } = formValue;
        setSuccessful(false);
        // Fake register success for now
        setTimeout(() => {
            setSuccessful(true);
            setMessage("Account created successfully (local mock)");
        }, 600);
    };

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-xl font-serif font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Bloggy
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleRegister}
                            >
                                {({ errors, touched, isSubmitting }) => (
                                    <Form className="space-y-4 md:space-y-6">
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Your email
                                            </label>
                                            <Field
                                                type="email"
                                                name="email"
                                                id="email"
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                                                    errors.email && touched.email ? "border-red-500" : ""
                                                }`}
                                                placeholder="name@company.com"
                                            />
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Password
                                            </label>
                                            <Field
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="••••••••"
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                                                    errors.password && touched.password ? "border-red-500" : ""
                                                }`}
                                            />
                                            <ErrorMessage
                                                name="password"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Confirm password
                                            </label>
                                            <Field
                                                type="password"
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                placeholder="••••••••"
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                                                    errors.confirmPassword && touched.confirmPassword ? "border-red-500" : ""
                                                }`}
                                            />
                                            <ErrorMessage
                                                name="confirmPassword"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <Field
                                                    id="terms"
                                                    name="terms"
                                                    type="checkbox"
                                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                    required
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                                                    I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">
                                                    Terms and Conditions
                                                </a>
                                                </label>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        >
                                            {isSubmitting ? "Creating account..." : "Create an account"}
                                        </button>
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                            Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                                        </p>
                                    </Form>
                                )}
                            </Formik>
                            {message && (
                                <div className={`mt-4 p-3 rounded ${
                                    successful ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                }`}>
                                    {message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegisterForm;