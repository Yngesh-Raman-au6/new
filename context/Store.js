import React, { useState, createContext } from 'react';

const initialState = {
    offerTitle: 'Lucky Offer',
    offerUrl: '/loading',
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