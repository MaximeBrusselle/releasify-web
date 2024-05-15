import React, { createContext, useEffect, useState } from "react";
import { auth } from "@/auth/firebase";
import { onAuthStateChanged } from "firebase/auth";

type AuthContextType = {
	currentUser: any;
	isLoggedIn: boolean;
	loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
	currentUser: null,
	isLoggedIn: false,
	loading: true,
});

export const AuthProvider: React.FC<any> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<any>(null);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, initializeUser);
		return unsubscribe;
	}, []);

	async function initializeUser(user: any) {
		if (user) {
			setCurrentUser(user);
			setIsLoggedIn(true);
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
	};

	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
