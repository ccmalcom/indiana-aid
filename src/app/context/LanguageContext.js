'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('en'); // Default language
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Check localStorage for saved language preference
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage && savedLanguage !== language) {
            console.log('Hydrating language from localStorage:', savedLanguage);

            setLanguage(savedLanguage);
            setLoaded(true);
        }
    }, [language]);

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
