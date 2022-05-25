import { Link } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { Context } from '../context/Store'
import HomeIcon from '@mui/icons-material/Home';
import { motion } from 'framer-motion';

Confirm.getInitialProps = async ({ query }) => {

    var response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/auth/verify`,{
        method: "POST",
        body: JSON.stringify({
            token: query.token
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    var data = await response.json()

    return {
        data: data,
    }
};

export default function Confirm({ data }) {
    const [state, setState] = useContext(Context);

    useEffect(() => {
        if (data.success) {

        setState(prevState => ({
            ...prevState,
            ['user']: data.user,
        }));
        }

    }, []);

    return (
        <div className="bg-dark vh-100 pt-5">
        <div className="container p-5 ">
            { state.user ?
                    <motion.div className="alert alert-success" role="alert"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0, duration: 0.7 }}
                    >
                        <h4 className="alert-heading">Your account is now verified !</h4>
                        <p><strong>{state.user.username}</strong>, your account is now activated for your email
                            (<strong> {state.user.email} </strong>). Now you can 
                            <strong> logged in</strong> to this website using the same credentials.</p>
                        <hr />
                        <Link href="/">
                            <button className="btn btn-success ">
                                <p className="mb-0 text-decoration-none">
                                    <HomeIcon className="mb-1" /> Return back to home.</p>
                            </button>
                        </Link>
                </motion.div>
                    : <motion.div className="alert alert-danger" role="alert"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0, duration: 0.7 }}
                    >
        <h4 className="alert-heading">Failed to verify!</h4>
                        <p>You are seeing this message because <strong>we could not verify your identity</strong>.
                            This maybe because the token expired or something went wrong.
                        </p>
        <hr />
                        <Link href="/" >
                            <button className="btn btn-danger ">
                                <p className="mb-0 text-decoration-none">
                                    <HomeIcon className="mb-1" /> Return back to home.</p>
                            </button>
                        </Link>
    </motion.div>
}
    </div >
    </div >

        )
};