import React, { createContext, useEffect, useState } from "react";
import { auth } from "@/auth/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUserData } from "@/data/api/getUserData";

type AuthContextType = {
    currentUser: any;
    isLoggedIn: boolean;
    loading: boolean;
    userData: any;
};

export const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    isLoggedIn: false,
    loading: true,
    userData: undefined,
});

export const AuthProvider: React.FC<any> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initalizeUser);
        return unsubscribe;
    });

    const updateUserData = async () => {
        if(currentUser) {
            const data = await getUserData();
            setUserData(data);
        }
    }

    async function initalizeUser(user: any) {
        if(user) {
            setCurrentUser(user);
            setIsLoggedIn(true);
            await updateUserData();
        } else {
            setCurrentUser(null);
            setIsLoggedIn(false);
        }
        setLoading(false);
    }

    const value = {
        currentUser,
        isLoggedIn,
        loading,
        userData,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}