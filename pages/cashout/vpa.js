import React, { useState, useContext } from 'react';
import Navbar from '../../Components/Navbar';
import AuthModel from '../../Components/AuthModel';
import AddVpa from '../../Components/payments/AddVpa';
import { Context } from '../../context/Store'
import TransferFund from '../../Components/payments/TransferFund';

VpaTransfer.getInitialProps = ctx => {

    if (ctx.res) {
        ctx.res.writeHead(302, { Location: '/' });
        ctx.res.end();
    }
    return {};
}

export default function VpaTransfer() {
    const [state, setState] = useContext(Context);

    return (
        <div className='bg-dark ' style={{ height: '100vh' }}>
            <Navbar />

            {/* Modal */}
            <AuthModel />

            <div className='container-fluid d-flex justify-content-center bg-dark'>
                {!state.user?.fundId ?
                    <AddVpa /> : <TransferFund />}
            </div>
        </div>
    );
}
