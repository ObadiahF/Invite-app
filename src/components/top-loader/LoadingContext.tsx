import React, { createContext, useState, useContext, useCallback } from 'react';

// Create a context with default values
const LoadingContext = createContext({
    isLoading: false,
    startLoading: () => { },
    stopLoading: () => { },
});

interface loadingProviderType {
    children: React.ReactNode
}

// Create a provider component
export const LoadingProvider = ({ children }: loadingProviderType) => {
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = useCallback(() => {
        setIsLoading(true);
        //window.scrollTo({top: 0, behavior: "smooth"});
    }, []);

    const stopLoading = useCallback(() => {
        setIsLoading(false);
    }, []);

    return (
        <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

// Custom hook to use the loading context
export const useLoading = () => {
    return useContext(LoadingContext);
};
