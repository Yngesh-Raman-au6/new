import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../context/Store'
import axios from 'axios';

export default function AddAccount() {
    const [state, setState] = useContext(Context);
    const [isDisabled, setisDisabled] = useState(true);
    const [isLoading, setisLoading] = useState(false);
    const [formData, setformData] = useState({ name: '', phone: '', accNo: '', ifsc: '', confirmAccNo: '' });


    useEffect(() => {
        if (formData.accNo === formData.confirmAccNo & formData.accNo.length != 0) {
            setisDisabled(false);
        }
        else {
            setisDisabled(true);
        }
    }, [formData])


    const createContact = async (payload) => {
        const res = await axios.post('/api/payment/contacts', payload);
        return res.data;
    };

    const setBankAccount = async (payload) => {
        const res = await axios.post('/api/payment/setbank', payload);
        return res.data;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setisDisabled(true);
        setisLoading(true);

        const payload_contact = {
            "name": formData.name,
            "email": state.user.email,
            "phone": formData.phone,
            "id": state.user._id,
        }

        const res_contact = await createContact(payload_contact);

        if (res_contact.success) {

            const payload_fund = {
                "id": state.user._id,
                "name": formData.name,
                "contact_id": res_contact.id,
                "ifsc": formData.ifsc,
                "account_number": formData.accNo,
            }

            const res_account = await setBankAccount(payload_fund);
            if (res_account.success) {
                setState(prevState => ({
                    ...prevState,
                    ['user']: res_account.user,
                }));
            }
        }

        setisDisabled(false);
        setisLoading(false);
    };

    return (
        <div className='col-md-6 bg-light p-4 rounded-3 mb-5'>
            <form className='mx-4 mb-5' onSubmit={handleSubmit}>
                <h4 className="mb-3">Fill out the details</h4>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" maxLength="70" id="name" aria-describedby="nameHelp"
                        value={formData.name} onChange={(e) => {
                            setformData({ name: e.target.value, phone: formData.phone, accNo: formData.accNo, ifsc: formData.ifsc, confirmAccNo: formData.confirmAccNo })
                        }} />
                    <div id="nameHelp" className="form-text">This should match with your bank account</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" pattern="\d*" maxLength={10} className="form-control" id="phone"
                        value={formData.phone} onChange={(e) => {
                            setformData({ name: formData.name, phone: e.target.value, accNo: formData.accNo, ifsc: formData.ifsc, confirmAccNo: formData.confirmAccNo })
                        }} />
                </div>

                <div className="mb-3">
                    <label htmlFor="bankacc" className="form-label">Bank Account Number</label>
                    <input type="number" className="form-control" id="bankacc"
                        value={formData.accNo} onChange={(e) => {
                            setformData({ name: formData.name, phone: formData.phone, accNo: e.target.value, ifsc: formData.ifsc, confirmAccNo: formData.confirmAccNo })
                        }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="ifsc" className="form-label">IFSC</label>
                    <input type="text" className="form-control" id="ifsc"
                        value={formData.ifsc} onChange={(e) => {
                            setformData({ name: formData.name, phone: formData.phone, accNo: formData.accNo, ifsc: e.target.value, confirmAccNo: formData.confirmAccNo })
                        }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="bankaccConfirm" className="form-label">Confirm Account Number</label>
                    <input type="password" className="form-control" id="bankaccConfirm" aria-describedby="accountHelp"
                        value={formData.confirmAccNo} onChange={(e) => {
                            setformData({ name: formData.name, phone: formData.phone, accNo: formData.accNo, ifsc: formData.ifsc, confirmAccNo: e.target.value })
                        }} />
                    <div id="accountHelp" className="form-text">Please recheck your details since this cannot be changed later</div>
                </div>


                {isLoading ? (<div className="float-end spinner-border text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>) :
                    <button type="submit" className="btn btn-primary float-end px-4" disabled={isDisabled}>Submit</button>
                }

            </form>
        </div>
    )
}
