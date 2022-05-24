import React, { useState, createContext } from 'react';

const initialState = {
    offerTitle: process.env.NEXT_PUBLIC_APP_NAME,
    offerUrl: '/loading',
    modelSignIn: true,
    user: null
};

export const Context = createContext();

const Store = ({ children }) => {

    const [state, setState] = useState(initialState);

    return (
        <Context.Provider value={[state, setState]}>
            {children}
        </Context.Provider>
    );
};

export default Store;