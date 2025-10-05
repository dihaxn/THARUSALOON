import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../features/message/MessageSlice.jsx";
import { login } from "../features/auth/AuthSlice.jsx";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const handleLogin = (formValue) => {
        const { email, password } = formValue;
        setLoading(true);

        dispatch(login({ email, password }))
            .unwrap()
            .then(() => {
                navigate("/home");
            })
            .catch(() => {
                setLoading(false);
            });
    };

    if (isLoggedIn) {
        return <Navigate to="/home" />;
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
            <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleLogin}
                    >
                        {({ errors, touched }) => (
                            <Form className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Your email
                                    </label>
                                    <Field
                                        type="email"
                                        name="email"
                                        id="email"
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
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
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                                            errors.password && touched.password ? "border-red-500" : ""
                                        }`}
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <Field
                                                id="remember"
                                                name="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-white hover:underline text-primary-600 dark:text-primary-500">
                                        Forgot password?
                                    </a>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    {loading ? "Loading..." : "Sign in"}
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don't have an account yet?{' '}
                                    <a href="/register" className="font-medium hover:underline text-primary-600 dark:text-primary-500">
                                        Sign up
                                    </a>
                                </p>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            {message && (
                <div className="fixed top-4 right-4 p-4 bg-red-500 text-white rounded shadow-lg">
                    {message}
                </div>
            )}
        </section>
    );
}