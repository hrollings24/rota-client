import React, { useContext, useEffect, useState } from "react";
import firebase from 'firebase/compat/app';
import { auth } from "../firebaseSetup";

export const AuthContext = React.createContext<firebase.User | null>(null);


export function AuthProvider() {
    const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])
    
    return (
        <AuthContext.Provider value={currentUser}>
             {!loading}
        </AuthContext.Provider>
    )
}


export function useAuth() {
    return useContext(AuthContext)
}