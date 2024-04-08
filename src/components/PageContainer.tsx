import React from 'react'; // Import React
import Navbar from './Navbar';

// Specify the type of props expected by PageContainer
interface PageContainerProps {
    children: React.ReactNode; // Using React.ReactNode for children
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
    return (
        <div className="flex flex-col h-screen w-screen">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
        </div>
    );
};

export default PageContainer;