import {createContext, useContext, useEffect, useState} from "react";
import {auth} from "../config/firebase.js";
import {onAuthStateChanged} from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user)
        })
    }, []);

    return (<AuthContext.Provider value={user}>
        {children}
    </AuthContext.Provider>)
}

export function useAuthContext() {
    return useContext(AuthContext)
}