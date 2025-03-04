import React from 'react';
import { FormikProps } from 'formik';
import { FormValues } from './EmailStep';
import Button from '@/components/ui/Button';

export interface NameStepProps {
  formik: FormikProps<FormValues>;
  handleNext: () => void;
}

const NameStep:React.FC<NameStepProps> = ({ formik, handleNext,}) => {
  return (
    <div className="mb-5 sm:w-[400px] md:w-[400px] lg:w-[400px] xl:w-[400px] mx-auto ">
      <h2 className="mb-4 text-center text-h6-semibold mt-3">¿Cómo te llamas?</h2>
      <p className="text-center font-medium mb-5">Vamos a crear tu perfil</p>

      <div className="mb-5">
        <label htmlFor="name" className="block mb-4 text-sm font-medium text-gray-900">Nombre</label>
        <input
          type="text"
          id="name"
          className="border border-white300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5"
          placeholder="Colocá tu nombre"
          onChange={formik.handleChange}
          value={formik.values.name}
          required
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="my-1  text-p2-semibold text-accent400">{String(formik.errors.name)}</div>
        ) : null}
      </div>

      <div className="mb-5">
        <label htmlFor="lastName" className="block mb-4 text-sm font-medium text-gray-900">Apellido</label>
        <input
          type="text"
          id="lastName"
          className="border border-white300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5"
          placeholder="Colocá tu apellido"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="my-1  text-p2-semibold text-accent400">{String(formik.errors.lastName)}</div>
        ) : null}
      </div>

        <div className="flex justify-center p-2">
            <Button onClick={handleNext} variant="solid" size="medium"
            className='w-full rounded-xl shadow-lg'
            >
            Siguiente
            </Button>
          </div>
    </div>
  );
};

export default NameStep;
