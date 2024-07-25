import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const NavigationContext = createContext();

export const Navigator = ({ children }) => {
    const [history, setHistory] = useState([]);
    const location = useLocation();

    useEffect(() => {
        setHistory((prev) => [...prev, location.pathname]);
    }, [location]);

    const removeLastEntry = () => {
        setHistory((prev) => prev.slice(0, -1));
    };

    return (
        <NavigationContext.Provider value={{ history, removeLastEntry }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigationHistory = () => {
    return useContext(NavigationContext);
};
