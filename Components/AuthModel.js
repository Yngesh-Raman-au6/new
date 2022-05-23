import React, { useContext, useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Context } from '../context/Store'

export default function AuthModel() {

    const [state, setState] = useContext(Context);

    return (
        <div className="modal fade modal-signin bg-secondary py-5" id="authModel"
            tabIndex="-1" aria-labelledby="authModelLabel" aria-hidden="true" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content rounded-4 shadow">
                    <div className="modal-header p-5 pb-4 border-bottom-0">
                        <h2 className="fw-bold text-dark mb-0">
                            {state.modelSignIn ? `Sign in` : `Sign up for free`}
                            </h2>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {state.modelSignIn ? <SignIn setModelSignIn={setState} /> : <SignUp setModelSignIn={setState} />}
                </div>
            </div>
        </div>

        )
};

export const SignUp = () => {

    const [state, setState] = useContext(Context);
    const [signUpData, setSignUpData] = useState({email: '', password:'', verifyPassword: ''});

    const submitData = async (e) => {
        e.preventDefault();
        console.log(signUpData);
    }

    return (
        <div className="modal-body p-5 pt-0">
            <form className="">
                <div className="form-floating mb-3">
                    <input type="email" className="form-control rounded-3" id="signupEmail"
                        placeholder="name@example.com" value={signUpData.email}

                        onChange={(e) =>
                            setSignUpData({
                                email: e.target.value,
                                password: signUpData.password,
                                verifyPassword: signUpData.verifyPassword,
                            })}
                    />
                    <label htmlFor="signupEmail">Email address</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="password" className="form-control rounded-3"
                        id="floatingPassword" placeholder="Password" value={signUpData.password}
                        onChange={(e) =>
                            setSignUpData({
                                email: signUpData.email,
                                password: e.target.value,
                                verifyPassword: signUpData.verifyPassword,
                            })} />

                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="password" className="form-control rounded-3"
                        id="confirmPassword" placeholder="Password" value={signUpData.verifyPassword}
                        onChange={(e) =>
                            setSignUpData({
                                email: signUpData.email,
                                password: signUpData.email,
                                verifyPassword: e.target.value,
                            })}  />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                </div>

                <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit" onClick={submitData}>Sign up</button>


                <div className="d-flex mt-2">
                    <small className="text-muted mx-auto">
                        Already have account? <a style={{ cursor: 'pointer' }} className="text-decoration-underline text-primary"
                            onClick={() =>
                                setState(prevState => ({
                                ...prevState,
                                ['modelSignIn']: true,
                            }))
                            }>
                            Sign in</a></small>
                </div>

                <hr className="my-3" />

                <h2 className="fs-5 fw-bold text-dark mb-3">Or use a third-party</h2>

                <button className="w-100 py-2 mb-2 btn btn-outline-dark rounded-3" type="submit">
                    <GoogleIcon className="mb-1 mx-1" /> Sign up with Google
                </button>
                <small className="text-muted">By clicking Sign up, you agree to the terms of use.</small>

            </form>
        </div>
        )
};


export const SignIn = () => {

    const [state, setState] = useContext(Context);
    const [signInData, setSignInData] = useState({ email: '', password: '' });

    const submitData = async (e) => {
        e.preventDefault();
        console.log(signInData);
    }
    return (
        <div className="modal-body p-5 pt-0">
            <form className="">
                <div className="form-floating mb-3">
                    <input type="email" className="form-control rounded-3" id="signinEmail"
                        placeholder="name@example.com" value={signInData.email}

                        onChange={(e) =>
                            setSignInData({
                                email: e.target.value,
                                password: signInData.password,
                            })}
                    /> 
                    <label htmlFor="signinEmail">Email address</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="password" className="form-control rounded-3"
                        id="Password" placeholder="Password" value={signInData.password}

                        onChange={(e) =>
                            setSignInData({
                                email: signInData.email,
                                password: e.target.value,
                            })}
                    />
                    <label htmlFor="Password">Password</label>
                </div>


                <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit"
                    onClick={submitData}
                >Sign in</button>


                <div className="d-flex mt-2">
                    <small className="text-muted mx-auto">
                        do not have account?
                        <a style={{ cursor: 'pointer' }} className="text-decoration-underline text-primary"
                            onClick={() => setState(prevState => ({
                                ...prevState,
                                ['modelSignIn']: false,
                            }))
                            }> Sign Up</a></small>
                </div>

                <hr className="my-3" />

                <h2 className="fs-5 fw-bold text-dark mb-3">Or use a third-party</h2>

                <button className="w-100 py-2 mb-2 btn btn-outline-dark rounded-3" type="submit">
                    <GoogleIcon className="mb-1 mx-1" /> Sign in with Google
                </button>
                <small className="text-muted">By clicking Sign In, you agree to the terms of use.</small>

            </form>
        </div>
    )
};