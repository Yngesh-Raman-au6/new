import React, { useState, useContext } from 'react';
import Navbar from '../Components/Navbar';
import AuthModel from '../Components/AuthModel';
import AddAccount from '../Components/AddAccount';
import { Context } from '../context/Store'
import TransferFund from '../Components/TransferFund';

const Cash = () => {
    const [state, setState] = useContext(Context);

    return (
        <div className='bg-dark ' style={{ height: '100vh' }}>
            <Navbar />

            {/* Modal */}
            <AuthModel />

            <div className='container-fluid d-flex justify-content-center bg-dark py-lg-3'>
                {!state.user?.contactId ?
                    <AddAccount /> : <TransferFund />}
            </div>
        </div>
    );
}

export default Cash;
