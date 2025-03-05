import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import EmailStep from '../stages/register/EmailStep';
import NameStep from '../stages/register/NameStep';
import PhoneStep from '../stages/register/PhoneStep';
import PasswordStep from '../stages/register/PasswordStep';
import { fetchRegisterUser } from '@/utils/FetchRegisterUser';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import ProgressBar from '../progressBar/bar';
import Cookies from 'js-cookie';

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      lastName: '',
      phoneNumber: '',
      country: '',
      birthDate: new Date('2000-01-10T10:02:00'),
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
   email: Yup.string()
         .email('Ingrese un email válido')
         .required('El email es requerido'),
         password: Yup.string()
         .min(8, 'La contraseña debe tener al menos  8 caracteres')
         .max(15,"la contraseña debe ser igual o menor a 15 caracteres")
         .required('La contraseña es requerida')
         .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo"),
         confirmPassword: Yup.string()
         .required('La confirmación de la contraseña es requerida')
         .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir'),
         name: Yup.string()
         .required('El nombre es requerido')
         .min(2, 'El nombre debe contener al menos 2 caracteres')
         .max(50, 'El nombre debe contener máximo 50 caracteres'),
         lastName: Yup.string()
         .required('El apellido es requerido')
         .min(2, 'El apellido debe contener al menos 2 caracteres')
         .max(50, 'El apellido debe contener máximo 50 caracteres'),
         phoneNumber: Yup.string()
         .required('El número de teléfono es requerido'),
         country: Yup.string()
         .required('El país es requerido'),
         birthDate: Yup.date()
         .required('La fecha de nacimiento es requerida')
         .nullable()
         .max(new Date(), 'La fecha de nacimiento no puede ser en el futuro')
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const { name, email, lastName, phoneNumber, password, country, birthDate } = values;

      const dataForRegisterUser = {
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        phoneNumber: Number(phoneNumber),
        birthDate: birthDate,
        country: country,
      };

      try {
        const response = await fetchRegisterUser(dataForRegisterUser);

        if (response.status === true) {
            Swal.fire({
              icon: 'success',
              title: `${response.message}`,
              showConfirmButton: false,
              timer: 1500
            });
            const dataCookies = {
              email: response.email,
              token: response.token,
              userId: response.userId,
            }
    
            Cookies.set('userLogged', JSON.stringify(dataCookies), {
              secure: true,
              sameSite: 'strict',
              expires: 7, 
            });
            setLoading(false);
            router.push("/app/home");
            return;
          } 
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema con el registro.',
            showConfirmButton: true,
          });
          setLoading(false);
        }
        },
      });
    

      const handlePrevious = () => {
        setStep((prevStep) => prevStep - 1);
      };

      const handleNext = async () => {
        let isValid = true; 
      
        if (step === 1) {
          await formik.setTouched({ email: true }); 
          const errors = await formik.validateForm();
          if (errors.email) {
            isValid = false; 
          }
        }
      
        if (step === 2) {
          await formik.setTouched({ name: true, lastName: true }); 
          const errors = await formik.validateForm();
          if (errors.name || errors.lastName) {
            isValid = false; 
          }
        }
      
        if (step === 3) {
          await formik.setTouched({ phoneNumber: true, birthDate: true, country: true }); 
          const errors = await formik.validateForm(); 
          if (errors.phoneNumber || errors.birthDate || errors.country) {
            isValid = false; 
          }
        }
      
        if (step === 4) {
          await formik.setTouched({ password: true, confirmPassword: true });
          const errors = await formik.validateForm(); 
          if (errors.password || errors.confirmPassword) {
            isValid = false; 
          }
        }
      
        if (isValid) {
          setStep(prevStep => prevStep + 1);
        }
      };
      

  return (
    <div className="flex flex-col justify-center items-center h-full sm:w-[400px] md:w-[400px] lg:w-[400px] xl:w-[400px] mx-auto">
        <ProgressBar onNext={handleNext} onPrevious={handlePrevious} totalSteps={4} currentStep={step}/>
      {step === 1 && <EmailStep formik={formik} handleNext={handleNext} />}
      {step === 2 && <NameStep formik={formik} handleNext={handleNext}/>}
      {step === 3 && <PhoneStep formik={formik} handleNext={handleNext} />}
      {step === 4 && <PasswordStep formik={formik}  loading={loading} />}
    </div>
  );
}
