import React, { useState, useContext } from 'react';
import Navbar from '../Components/Navbar';
import AuthModel from '../Components/AuthModel';
import AddAccount from '../Components/payments/AddVpa';
import { Context } from '../context/Store'
import TransferFund from '../Components/TransferFund';
import { useRouter } from 'next/router';


Cash.getInitialProps = (ctx) => {
    if (ctx.res) {
        ctx.res.writeHead(302, { Location: '/' });
        ctx.res.end();
    }
    return {};

};

const Cash = () => {
    const router = useRouter();

    const [state, setState] = useContext(Context);

    if (!state.user) router.push('/');

    return (
        <div className='bg-dark ' style={{ height: '100vh' }}>
            <Navbar />

            {/* Modal */}
            <AuthModel />

            <div className='container-fluid d-flex justify-content-center bg-dark py-lg-3'>
                {!state.user?.bankAccountId ?
                    <AddAccount /> : <TransferFund />}
            </div>
        </div>
    );
}

export default Cash;
