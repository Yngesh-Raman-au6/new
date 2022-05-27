import React, { useContext, useRef, useEffect, useState } from 'react';
import { Context } from '../context/Store'
import GoogleIcon from '@mui/icons-material/Google';
import { motion } from 'framer-motion';
import axios from 'axios';
const { createHash } = require('crypto');
import { signInWithGoogle, signUpWithGoogle } from '../utils/firebase/auth';
import ClientCaptcha from 'react-client-captcha'

export function hashStr(str) {
    return createHash('sha256').update(str).digest('hex');
}

export default function AuthModel({ }) {

    const [state, setState] = useContext(Context);
    const closeBtnRef = useRef(null);

    return (
        <>

        <div className="modal fade py-5" id="authModel"
            tabIndex="-1" aria-labelledby="authModelLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered " role="document">
                <div className="modal-content rounded-4 bg-dark shadow">
                    <div className="modal-header p-5 pb-4 border-bottom-0">
                        <h2 className="fw-bold text-bright mb-0">
                            {state.modelSignIn ? `Sign in` : `Sign up for free`}
                            </h2>
                        <button type="button" ref={closeBtnRef} className="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {state.modelSignIn ? <SignIn closeBtnRef={closeBtnRef} /> : <SignUp closeBtnRef={closeBtnRef} />}
                </div>
            </div>
        </div>
            </>
        )
};

export const SignUp = ({ closeBtnRef }) => {
    const [state, setState] = useContext(Context);
    const [signUpData, setSignUpData] = useState({email: '', password:'', verifyPassword: ''});
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [authIsDisabled, setAuthIsDisabled] = useState(false);
    const [resError, setResError] = useState('');
    const [code, setCode] = useState('');
    const [inputCode, setInputCode] = useState('')

    useEffect(() => {
        setResError('');
        const { email, password, verifyPassword } = signUpData;
        if (password.length >= 6 && password === verifyPassword && email.includes('.') && email.includes('@') && isVerified) {
            setIsDisabled(false);
        }
        else {
            setIsDisabled(true);
        }

    }, [signUpData, isVerified, inputCode])

    const handleCaptcha = (e) => {
        e.preventDefault();

        console.log(inputCode);
        console.log(code);

        if (inputCode === code) {
            setIsVerified(true);
            setResError("");
        }
        else {
            setResError("Code does not match");
        }
    }

    const submitData = async (e) => {
        e.preventDefault();
        setIsDisabled(true);
        setIsLoading(true);

        const res = await axios.post('/api/user/auth/signup', {
            email: signUpData.email.toLowerCase(),
            password: hashStr(signUpData.password)
        });

        const data = res.data;

        if (data.success) {
            await axios.post('api/user/email', data.user);
            setIsDisabled(false);
            setSignUpData({ email: '', password: '', verifyPassword: '' });
            setIsLoading(false);

            setState(prevState => ({
                ...prevState,
                ['modelSignIn']: true,
                ['accountCreatedSuccess']: true
            }));
            closeBtnRef.current.click();
        }
        else {
            setIsLoading(false);
            setResError(data.response)
            setIsDisabled(false);
        }
    }

    const handleGoogleAuth = async () => {
        setIsDisabled(true);
        setAuthIsDisabled(true);
        setResError("")

        const res = await signUpWithGoogle();
        if (res.success) {
            setState(prevState => ({
                ...prevState,
                ['user']: res.user,
            }));
            closeBtnRef.current.click();
        }
        else {
            setResError(res.response)
            setIsDisabled(false);
            setAuthIsDisabled(false);
        }
    };

    return (<>

        <motion.div className="modal-body p-5 pt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0, duration: 0.5 }} >
            <form className="">
                <div className="input-group mb-3">
                    <input type="email" className="form-control form-control-lg fs-6 rounded-3" id="signupEmail"
                        placeholder="Your email" value={signUpData.email}

                        onChange={(e) =>
                            setSignUpData({
                                email: e.target.value,
                                password: signUpData.password,
                                verifyPassword: signUpData.verifyPassword,
                            })}
                    />
                </div>

                    <div className="input-group mb-3">
                    <input type="password" className="form-control form-control-lg fs-6 rounded-3"
                        id="floatingPassword" placeholder="Password" value={signUpData.password}
                        onChange={(e) =>
                            setSignUpData({
                                email: signUpData.email,
                                password: e.target.value,
                                verifyPassword: signUpData.verifyPassword,
                            })} />

                </div>


                    <div className="input-group mb-3">
                    <input type="password" className="form-control form-control-lg fs-6 rounded-3"
                        id="confirmPassword" placeholder="Confirm password" value={signUpData.verifyPassword}
                        onChange={(e) =>
                            setSignUpData({
                                email: signUpData.email,
                                password: signUpData.password,
                                verifyPassword: e.target.value,
                            })}  />
                </div>

                <div className="d-flex justify-content-center">
                    <div className="row justify-content-center ">
                        <div className="col-6 col-lg-6">
                            <ClientCaptcha captchaCode={(code) => setCode(code)} />
                        </div>
                        <div className="col-8 col-lg-6 mt-3 mt-lg-0">
                            <div className="input-group mb-3">
                                <input type="text"
                                    className="form-control fs-5 p-0 text-center" value={inputCode}
                                    onChange={(e) => setInputCode(e.target.value)} disabled={isVerified} maxLength="4" />
                            <span className="input-group-text p-0" id="basic-addon2">
                                    <button className={`btn btn-outline rounded-0 rounded-end ${isVerified && `text-success`}`}
                                        onClick={handleCaptcha} disabled={isVerified}>{!isVerified ? `Verify` : `Verified`}</button>
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center my-2">
                    <span className="text-center text-danger">{resError}</span>
                </div>

         

                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-100 mt-1 btn btn-lg  rounded-3 border-0 btn-lightgray text-white"
                    type="submit" onClick={submitData} disabled={isDisabled}>
                    {isLoading ? (<div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>) : `Sign up`
                    }
                </motion.button>


                <div className="d-flex mt-2">
                    <small className="text-white mx-auto">
                        Already have account? <a style={{ cursor: 'pointer' }} className="text-decoration-underline text-primary"
                            onClick={() =>
                                setState(prevState => ({
                                ...prevState,
                                ['modelSignIn']: true,
                            }))
                            } >
                            Sign in</a></small>
                </div>

                <hr className="my-3" />


                <button className="w-100 py-2 mb-2 btn btn-outline-secondary text-bright rounded-3" type="button"
                    onClick={handleGoogleAuth} disabled={authIsDisabled}>
                    <GoogleIcon className="mb-1 mx-1" /> Sign up with Google
                </button>
                <small className="text-white">By clicking Sign up, you agree to the terms of use.</small>

            </form>
        </motion.div>
        </>
        )
};


export const SignIn = ({ closeBtnRef }) => {

    const [state, setState] = useContext(Context);
    const [signInData, setSignInData] = useState({ email: '', password: '' });
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [authIsDisabled, setAuthIsDisabled] = useState(false);
    const [resError, setResError] = useState('');

    useEffect(() => {
        setResError('');
        const { email, password } = signInData;
        if (password.length >= 6 && email.includes('.') && email.includes('@')) {
            setIsDisabled(false);
        }
        else {
            setIsDisabled(true);
        }

    }, [signInData]);


    const submitData = async (e) => {
        e.preventDefault();
        setIsDisabled(true);
        setIsLoading(true);

        const res = await axios.post('/api/user/auth/login', {
            email: signInData.email.toLowerCase(),
            password: hashStr(signInData.password)
        });

        const data = res.data;
        console.log(data);

        if (data.success) {
            setState(prevState => ({
                ...prevState,
                ['user']: data.user,
            }));
            setIsLoading(false);
            setSignInData({ email: '', password: '' });
            closeBtnRef.current.click();
        }
        else {
            setIsLoading(false);
            setResError(data.response)
            setIsDisabled(false);
        }
    };

    const handleGoogleAuth = async () => {
        setIsDisabled(true);
        setAuthIsDisabled(true);
        setResError("")

        const res = await signInWithGoogle();
        if (res.success) {
            setState(prevState => ({
                ...prevState,
                ['user']: res.user,
            }));
            closeBtnRef.current.click();
        }
        else {
            setResError(res.response)
            setIsDisabled(false);
            setAuthIsDisabled(false);
        }
    };

    return (
        <motion.div className="modal-body p-5 pt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0, duration: 0.5 }} >
            <form className="">
                <div className="input-group mb-3">
                    <input type="email" className="form-control form-control-lg fs-6 rounded-3" id="signinEmail"
                        placeholder="Email" value={signInData.email}

                        onChange={(e) =>
                            setSignInData({
                                email: e.target.value,
                                password: signInData.password,
                            })}
                    /> 
                </div>

                <div className="input-group mb-3">
                    <input type="password" className="form-control form-control-lg fs-6 rounded-3"
                        id="Password" placeholder="Password" value={signInData.password}

                        onChange={(e) =>
                            setSignInData({
                                email: signInData.email,
                                password: e.target.value,
                            })}
                    />
                </div>


                <div className="d-flex justify-content-center my-2">
                    <span className="text-center text-danger">{resError}</span>
                </div>
                {state.accountCreatedSuccess &&
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Account created !</strong> Please check your inbox for an activation mail to complete the registration process.
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() =>
                        setState(prevState => ({
                            ...prevState,
                            ['accountCreatedSuccess']: false
                        }))
                        }>
                    </button>

                    </div>
                }
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-100 my-2 btn btn-lg rounded-3 border-0 btn-lightgray text-white" type="submit"
                    onClick={submitData}
                    disabled={isDisabled}
                > {isLoading ? (<div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>) : `Sign in`
                    }</motion.button>


                <div className="d-flex mt-2">
                    <small className="text-white mx-auto">
                        do not have account?
                        <a style={{ cursor: 'pointer' }} className="text-decoration-underline text-primary"
                            onClick={() => setState(prevState => ({
                                ...prevState,
                                ['modelSignIn']: false,
                            }))
                            }> Sign Up</a></small>
                </div>

                <hr className="my-3" />


                <button className="w-100 py-2 mb-2 btn btn-outline-secondary text-bright rounded-3" type="button"
                    onClick={handleGoogleAuth}
                    disabled={authIsDisabled}>
                    <GoogleIcon className="mb-1 mx-1" /> Sign in with Google
                </button>
                <small className="text-white">By clicking Sign In, you agree to the terms of use.</small>

            </form>
        </motion.div>
    )
};