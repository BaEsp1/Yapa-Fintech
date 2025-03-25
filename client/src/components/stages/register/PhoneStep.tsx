import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from 'react-select';
import { MODIFIED_COUNTRIES } from '@/lib/countryList';
import { NameStepProps } from './NameStep';
import Button from '@/components/ui/Button';

const PhoneStep: React.FC<NameStepProps> = ({ formik, handleNext }) => {
  return (
    <div className="mb-5 sm:w-[400px] md:w-[400px] lg:w-[400px] xl:w-[400px] mx-auto">
      <h2 className="mb-4 text-center text-h6-semibold mt-3">¿Cómo podemos contactarte?</h2>
      <p className="text-center font-medium mb-5">Son pocos pasos</p>

      <div className="mb-5">
        <label htmlFor="phoneNumber" className="block mb-4 text-sm font-medium text-gray-900">Número de Teléfono</label>
        <PhoneInput
          value={formik.values.phoneNumber}
          onChange={(phoneNumber) => {
            formik.setFieldValue('phoneNumber', phoneNumber);
          }}
          inputStyle={{
            width: '100%',
            height: '40px',
          }}
          containerStyle={{
            marginTop: '10px',
          }}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <div className="my-1 text-accent400  text-p2-semibold">{String(formik.errors.phoneNumber)}</div>
        ) : null}
      </div>

      <div className="mb-5">
        <label htmlFor="country" className="block mb-2 text-sm font-medium text-black">Seleccioná tu país</label>
        <Select
          id="country"
          name="country"
          options={MODIFIED_COUNTRIES}
          value={MODIFIED_COUNTRIES.find(option => option.value === formik.values.country)}
          onChange={(option) => formik.setFieldValue('country', option?.value || '')}
          onBlur={formik.handleBlur}
          placeholder="Seleccione un pais"
          className="bg-gray-50 border-4 text-gray-900 text-sm rounded-lg block w-full"
        />
        {formik.touched.country && formik.errors.country ? (
          <div className="my-1 text-accent400  text-p2-semibold">{String(formik.errors.country)}</div>
        ) : null}
      </div>

      <div className="mb-5">
        <label htmlFor="birthDate" className="block mb-4 text-sm font-medium text-gray-900">Fecha de Nacimiento</label>
        <input
          type="date"
          name="birthDate"
          id="birthDate"
          className="border border-white300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
          value={formik.values.birthDate ? formik.values.birthDate.toISOString().split('T')[0] : ''}
          onChange={(e) => formik.setFieldValue('birthDate', new Date(e.target.value))}
        />
        {formik.touched.birthDate && formik.errors.birthDate ? (
          <div className="my-1  text-accent400  text-p2-semibold">{String(formik.errors.birthDate)}</div>
        ) : null}
      </div>

        <div className="flex justify-center p-2 ">
            <Button onClick={handleNext} variant="solid" size="medium"
            className='w-full rounded-xl shadow-lg'
            >
            Siguiente
            </Button>
          </div>
    </div>
  );
};

export default PhoneStep;
