import React from "react";
import Navbar from "@/components/Navbar";

interface PageContainerProps {
	children: React.ReactNode;
	isLoggedIn: boolean;
	handleLogin: () => void;
	handleLogout: () => void;
}

const PageContainer: React.FC<PageContainerProps> = (props: PageContainerProps) => {
	const { children, isLoggedIn, handleLogin, handleLogout } = props;
	return (
		<div className="flex flex-col h-screen w-screen overflow-x-hidden">
			<Navbar isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout}/>
			<main className="flex-grow m-5 mb-16">{children}</main>
		</div>
	);
};

export default PageContainer;
