import Image from 'next/image';
import React from 'react';
import logo from "@/assets/logo/LogoLargo.png"
import Link from 'next/link';
import isUserLogged from '@/utils/isUserLogged';
import { redirect } from 'next/navigation';

const AccountLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {


    const token = await isUserLogged(); 
    if (!(token === false)) {
        redirect('/app/home');
        
    }

    return (
        <div className='w-full  h-auto bg-white pt-10 px-4'>
            <div className='flex justify-center items-center flex-col'>
                <Image src={logo} alt='Logo' width={200} height={200} />
            </div>  
            <main>
                {children}
            </main>
            <footer className='flex justify-between p-4 border-t w-full fixed bottom-0 left-0 right-0 bg-white'>
                <p className='text-sm text-start flex items-center'>© 2025 Yapa.</p>
                <div className='flex flex-col text-end'>
                    <Link href='/' className='text-sm w-full'>Términos y condiciones</Link>
                    <Link href='/' className='text-sm w-full'>Política de privacidad</Link>
                </div>
            </footer>
        </div>
    );
};

export default AccountLayout;