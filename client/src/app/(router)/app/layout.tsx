
import isUserLogged from '@/utils/isUserLogged';
import { redirect } from 'next/navigation';
import React from 'react';
import Navbar from '../../../components/layout/Navbar';
import Dashboard from '@/components/layout/Dashboard';


const AppLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {

    const token = await isUserLogged();
    if (token === false) {
        redirect('/login');
    }


    return (
        <div className=''>
            <Navbar />
            <main>{children}</main>
            <Dashboard />
        </div>
    );
};

export default AppLayout;
