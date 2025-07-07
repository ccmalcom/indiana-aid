'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('en'); // Default language
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            console.log('Hydrating language from localStorage:', savedLanguage);
            setLanguage(savedLanguage);
        } else {
            const browserLanguage = navigator.language?.slice(0, 2);
            console.log('Setting language from browser:', browserLanguage);
            if (browserLanguage) {
                setLanguage(browserLanguage);
                localStorage.setItem('language', browserLanguage);
            }
        }
        setLoaded(true);
    }, []);

    const changeLanguage = (lang) => {
        console.log('Changing language to:', lang);
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, loaded }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
