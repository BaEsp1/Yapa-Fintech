import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PasswordRequirements from '@/components/PasswordRequirements';
import { FormikProps } from 'formik';
import { FormValues } from './EmailStep';
import Button from '@/components/ui/Button';

export interface PasswStepProps {
  formik: FormikProps<FormValues>;
  loading: boolean;
}

const PasswordStep: React.FC<PasswStepProps> = ({ formik, loading }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-5 sm:w-[400px] md:w-[400px] lg:w-[400px] xl:w-[400px] mx-auto">
      <h2 className="mb-4 text-center text-h6-semibold mt-3">Creá tu contraseña</h2>
      <p className="text-center font-medium mb-5">Asegúrate de que sea segura</p>

      <form onSubmit={formik.handleSubmit}> {/* Formik onSubmit */}
        {/* Campo para Contraseña */}
        <div className="mb-5">
          <label htmlFor="password" className="block mb-4 text-sm font-medium text-gray-900">Contraseña</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="border border-white300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5"
              placeholder="Ingresá tu contraseña"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {showPassword ? (
              <FaEye className="absolute right-3 top-4 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
            ) : (
              <FaEyeSlash className="absolute right-3 top-4 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
            )}
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="my-1 text-accent400  text-p2-semibold">{String(formik.errors.password)}</div>
          ) : null}
        </div>

        {/* Campo para Confirmar Contraseña */}
        <div className="mb-5">
          <label htmlFor="confirmPassword" className="block mb-4 text-sm font-medium text-gray-900">Confirmar Contraseña</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              className="border border-white300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5"
              placeholder="Repite tu contraseña"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            {showPassword ? (
              <FaEye className="absolute right-3 top-4 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
            ) : (
              <FaEyeSlash className="absolute right-3 top-4 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
            )}
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="my-1  text-accent400  text-p2-semibold">{String(formik.errors.confirmPassword)}</div>
          ) : null}
        </div>

        {/* Requisitos de la Contraseña */}
        <PasswordRequirements password={formik.values.password} />

        {/* Botón de Enviar */}
        <div className="flex justify-center p-2 pt-4">
          <Button 
            type="submit" 
            variant="solid" 
            size="medium"
            className="w-full rounded-xl shadow-lg"
          >
            {!loading ? "Registrarse" : "Cargando..."}
          </Button>
        </div>
      </form> {/* Cierre del form */}
    </div>
  );
};

export default PasswordStep;
