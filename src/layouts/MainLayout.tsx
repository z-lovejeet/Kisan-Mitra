import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { SOSButton } from '../components/features/SOSButton';

export const MainLayout: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen flex flex-col font-sans">
            <Navbar />
            <main className="flex-grow pt-16">
                <Outlet />
            </main>
            <SOSButton />
            <Footer />
        </div>
    );
};
