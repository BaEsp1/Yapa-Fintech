import React from 'react';
import { FormikProps } from 'formik';
import { redirect } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
const URL = process.env.NEXT_PUBLIC_API_URL

export interface FormValues {
    email: string;
    name: string;
    lastName: string;
    phoneNumber: string;
    country: string;
    birthDate: Date;
    password: string;
    confirmPassword: string;
  }

interface EmailStepProps {
  formik: FormikProps<FormValues>;
  handleNext: () => void;
}

const EmailStep: React.FC<EmailStepProps> = ({ formik, handleNext }) => {
    const loginGoogle = () =>{
      redirect(`${URL}/oauth2/authorization/google`)
    }

    return (
    <div className="mb-5 sm:w-[400px] md:w-[400px] lg:w-[400px] xl:w-[400px] mx-auto">
      <h2 className="mb-4 text-center text-h6-semibold mt-3 pt-2">Ingresá tu correo electrónico</h2>
      <label htmlFor="email" className="block mb-4 text-sm font-medium text-gray-900 ">Correo</label>
      <input
        type="email"
        id="email"
        className="border border-white300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5"
        placeholder="Ingresá tu email"
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur} 
        value={formik.values.email}    
      />
      {formik.touched.email && formik.errors.email ? (
        <div className="my-1 text-p2-semibold text-accent400">{String(formik.errors.email)}</div>
      ) : null}
      <button onClick={handleNext} type="button" className="w-full mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:bg-primary400 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
        Crear Cuenta
      </button>
      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-4 text-gray-400">o</span>
        <div className="flex-grow border-t border-gray-400"></div>
        </div>
            <button type="button" onClick={loginGoogle} className="w-full mt-5 text-black font-bold bg-white border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 flex items-center justify-center">
            <FcGoogle width={20} height={20} className="mr-2" />
            Continuar con Google
            </button>
    </div>

  );
};

export default EmailStep;
