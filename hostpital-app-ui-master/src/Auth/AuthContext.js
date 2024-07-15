import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'))

    useEffect(() => {
        localStorage.setItem('token', token || '');
    }, [token]);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user) || '{}');
    }, [user])

    function logout() {
        setUser({});
        setToken(null)
        return true;
    }

    const value = {
        token,
        user,
        setToken,
        setUser,
        logout
    }

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}