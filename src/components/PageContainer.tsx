import React from 'react'; // Import React
import Navbar from './Navbar';

// Specify the type of props expected by PageContainer
interface PageContainerProps {
    children: React.ReactNode; // Using React.ReactNode for children
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
    return (
        <div className="flex flex-col h-screen w-screen overflow-x-hidden">
            <Navbar />
            <main className="flex-grow m-5 mb-16">
                {children}
            </main>
        </div>
    );
};

export default PageContainer;