import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Icon } from "@iconify/react";
import loadingLoop from "@iconify/icons-line-md/loading-loop";
import style from "./index.module.css";

const SignIn = () => {
    const [isLoading, setIsLoading] = useState(true);

     const validationSchema = Yup.object().shape({
         username: Yup.string()
             .matches(/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces')
             .required('Full Name is required'),
         password: Yup.string()
             .matches(/^[a-zA-Z\s]+$/, 'Must be a valid password')
             .required('password is required'),
     });

    const handleSubscribe = async (values, { resetForm }) => {
        try {
            setIsLoading(true);
            const payload = {
                username: values.username,
                password: values.password
                // merge_fields: {
                //     FNAME: values.fullName,
                //     LNAME: "name",
                // },
            };
            const response = await axios.post("http://localhost:8080/api/v1/request/sign_in/user", payload);

            if (response.status === 202) {
                toast.success(`Hi ${values.username}You are now a citizen`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setIsLoading(false);
                console.log(response);
                resetForm();
            } else {
                toast.warning(`Subscription failed. Please try again based on`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error during subscription:', error);
            toast.error(`Subscription failed. Please try again ${error.response.data}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubscribe}
            >
                {({ values, errors , touched, handleChange, handleBlur }) => (
                    <Form>
                        <div className={style.subCont}><div className={style.innerCont}>
                                <div className={style.contentCont}>
                                    <div className={style.contentSection}>
                                        <p className={style.topic}>Hear From Our Town Crier</p>
                                        <p className={style.text}>
                                            Subscribe to our newsletter to stay connected to our activities,
                                            get insights and updates on what's happening in our community!
                                        </p>
                                    </div>
                                </div>
                                <div className={style.inputSection}>
                                    <div>
                                        <Field
                                            type="text"
                                            name="username"
                                            placeholder="Enter Username"
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            style={{
                                                borderColor: errors.username && touched.username? "red" : "inherit",
                                            }}
                                        />
                                        {errors.username && touched.username && (
                                            <div className={style.error}>{errors.username}</div>
                                        )}
                                    </div>

                                    <div>
                                        <Field
                                            type="text"
                                            name="password"
                                            placeholder="Enter password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            style={{
                                                borderColor: errors.password && touched.password ? "red" : "inherit",
                                            }}
                                        />
                                        {errors.password && touched.password && (
                                            <div className={style.error}>{errors.password}</div>
                                        )}
                                    </div>

                                    <div className={style.btn}>
                                        <button type="submit" className={style.btn}>
                                            {isLoading ? (
                                                <div className="flex items-center justify-center">
                                                    <Icon width={24} height={24} icon={loadingLoop} />
                                                </div>
                                            ) : (
                                                "Subscribe"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>

            <ToastContainer />
        </div>
    );
};

export default SignIn;