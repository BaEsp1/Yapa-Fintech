'use client';
import React, { useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { redirect, useRouter } from 'next/navigation'
import Link from 'next/link';
import Cookies from 'js-cookie';
import { FaArrowLeft, FaArrowRight, FaEye, FaEyeSlash, } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { MODIFIED_COUNTRIES } from '@/lib/countryList';
import Select from 'react-select';
import PasswordRequirements from '@/components/PasswordRequirements';
import { fetchRegisterUser } from '@/utils/FetchRegisterUser';
const URL = process.env.NEXT_PUBLIC_API_URL 

export default function RegisterForm() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const [step, setStep] = useState(1);

    const validationSchema = Yup.object({
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
    });

  const formik = useFormik({
    initialValues:{
      email: "",
      name:"",
      lastName:"",
      phoneNumber:"",
      country: "",
      birthDate: "",
      password: "",
      confirmPassword:"",
    },
    validationSchema,
    onSubmit: async  (values) => {
      setLoading(true);
      const {name ,email, lastName, phoneNumber, password,country, birthDate} = values;

      const dataForRegisterUser = {
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        phoneNumber: Number(phoneNumber),
        birthDate: `${birthDate}T00:00:00` ,    
        country:country,
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
          token: response.jwt,
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

    const loginGoogle = () =>{
      redirect(`${URL}/oauth2/authorization/google`)
    }

  const validateStep = () => {
    switch (step) {
      case 1:
        return !formik.errors.email && formik.values.email !== "";
      case 2:
        return !formik.errors.name && formik.values.name !== "" && !formik.errors.lastName && formik.values.lastName !== "";
      case 3:
        return !formik.errors.phoneNumber && formik.values.phoneNumber !== "" && !formik.errors.country && formik.values.country !== "" && !formik.errors.birthDate && formik.values.birthDate !== "";
      case 4:
        return !formik.errors.password && formik.values.password !== "" && !formik.errors.confirmPassword && formik.values.confirmPassword !== "";
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      // console.log(validateStep());
      setStep(step + 1);
    } else {
      
    }
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };


  const getProgressWidth = () => {
    switch (step) {
      case 1:
        return '25%';
      case 2:
        return '50%';
      case 3:
        return '75%';
      case 4:
        return '100%';
      default:
        return '0%';
    }
  };
  
  return (
    <div className='pb-20 sm:w-[400px] md:w-[400px] lg:w-[400px] xl:w-[400px] mx-auto bg-white  rounded-lg'>
            {step === 1 && (<>
            
              <div> 
                <h2 className='mb-4 text-center font-semibold mt-3'>Bienvenido a Yapa</h2>
                <p className='text-center font-medium mb-5'>Crea tu cuenta y empecemos</p>
            </div>

              <div className=''>
                {/*aqui*/}
              <div className="flex justify-center space-x-4 mb-4">
                
                <Link href="/account/register" className="w-full px-4 text-center py-2 border-b-2 border-blue-500 text-black hover:text-blue-500">
                    Registro
                </Link>
                
                <Link href="/account/login" className=" w-full text-center px-4 py-2 border-b-2 border-blue-500 text-black hover:text-blue-500">
                    Ingreso
                </Link>
              </div>
              </div>
            </>)}
        <form
          onSubmit={formik.handleSubmit}
          className=''
        > 
          {step === 1 && (
                <div className="mb-5">
                  <label htmlFor="email" className="block mb-4 text-sm font-medium text-gray-900">Correo</label>
                  <input
                    type="email"
                    id="email"
                    className="border border-gray-600  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5   dark:focus:ring-primary700 dark:focus:border-primary700" 
                    placeholder="EJ: name@gmail.com"
                    onChange={formik.handleChange}
                    value={formik.values.email} 
                  />
                  {formik.touched.email && formik.errors.email ? (
                        <div className='my-1 text-primaryDefault'>{String(formik.errors.email)}</div>
                  ) : null}
                    
                  <button  onClick={handleNext} type="submit" className="w-full mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:bg-primary400  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">
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
                  <div className="text-center mt-4">
                    <span>¿Ya tienes cuenta? Ingresa haciendo click </span>
                    <Link href="/account/login" className="text-blue-700 hover:underline">
                      aquí.
                    </Link>
                  </div>
                </div>
              )}

              {step === 2 && (
                <>
                  <div className='w-full my-4'>
                    <h2 className='mb-4 text-center font-semibold mt-3'>¿Cual es tu nombre?</h2>
                    <p className='text-center font-medium mb-5'>vamos a crear tu perfil</p>
                  </div>
                  <div className='flex justify-between items-center gap-5 my-5'>
                    <button onClick={handlePrevious} type="button" className="flex items-center text-blue-700 hover:underline">
                      <FaArrowLeft className="mr-2" />
                      Atrás
                    </button>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-300">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: getProgressWidth() }}></div>
                    </div>
                    <button onClick={handleNext} type="button" className="flex items-center text-blue-700 hover:underline ml-auto">
                      Adelante
                      <FaArrowRight className="ml-2" />
                    </button>
                  </div>

                <div className="mb-5">
                  <label htmlFor="name" className="block mb-4 text-sm font-medium text-gray-900">Nombres</label>
                  <input
                    type="text"
                    id="name"
                    className="border border-gray-600  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5   dark:focus:ring-primary700 dark:focus:border-primary700" 
                    placeholder="EJ: Isaac David"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    required 
                  />
                  {formik.touched.name && formik.errors.name ? (
                        <div className='my-1 text-primaryDefault'>{String(formik.errors.name)}</div>
                  ) : null}
                </div>

                <div className="mb-5">
                  <label htmlFor="lastName" className="block mb-4 text-sm font-medium text-gray-900">Apellidos</label>
                  <input
                    type="text"
                    id="lastName"
                    className="border border-gray-600  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5   dark:focus:ring-primary700 dark:focus:border-primary700" 
                    placeholder="EJ: Isaac David"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                        <div className='my-1 text-primaryDefault'>{String(formik.errors.lastName)}</div>
                  ) : null}
                    
                  <button  onClick={handleNext} type="button" className="w-full mt-5 text-black bg-white hover:bg-blue-800 focus:outline-primary900 focus:ring-4 focus:bg-primary900 border border-primary900 focus:text-white  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">Siguiente</button>
                </div>
                </>
              )}
              
              {step === 3 && ( 

                <>
                <div className='w-full my-4'>
                    <h2 className='mb-4 text-center font-semibold mt-3'>¿Como podemos contactarte?</h2>
                    <p className='text-center font-medium mb-5'>seran pocos pasos</p>
                  </div>
                <div className='flex justify-between items-center gap-5 my-8'>
                    <button onClick={handlePrevious} type="button" className="flex items-center text-blue-700 hover:underline">
                      <FaArrowLeft className="mr-2" />
                      Atrás
                    </button>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-300">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: getProgressWidth() }}></div>
                    </div>
                    <button onClick={handleNext} type="button" className="flex items-center text-blue-700 hover:underline ml-auto">
                      Adelante
                      <FaArrowRight className="ml-2" />
                    </button>
                  </div>
                  <div className="mb-5">
                    <label htmlFor="phoneNumber" className="block mb-4 text-sm font-medium text-gray-900">Número de Teléfono</label>
                    
                      <PhoneInput
                            // country={'ar'}
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
                      <div className='my-1 text-primaryDefault'>{String(formik.errors.phoneNumber)}</div>
                    ) : null}
                  </div>

                  <div className='mb-5'>
                    <label htmlFor="country" className="block mb-2 text-sm font-medium text-black">Selecciona tu paìs</label>
                    <Select
                      id="country"
                      name="country"
                      options={MODIFIED_COUNTRIES}
                      value={MODIFIED_COUNTRIES.find(option => option.value === formik.values.country)}
                      onChange={(option) => formik.setFieldValue('country', option?.value || '')}
                      onBlur={formik.handleBlur}
                      placeholder="Seleccione un pais"
                      className={`bg-gray-50 border-4 text-gray-900 text-sm rounded-lg  block w-full   dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500   'border-gray-300 focus:ring-gray-300 focus:border-gray-300'}`}
                      styles={{
                      option: (provided) => ({
                        ...provided,
                        color: 'black',
                      }),
                      }}
                    />
                      {formik.touched.country && formik.errors.country ? (
                        <div className='my-1 text-primaryDefault'>{String(formik.errors.country)}</div>
                      ) : null}
                  </div>


                  <div className="mb-5">
                    <label htmlFor="birthDate" className="block mb-4 text-sm font-medium text-gray-900">Fecha de Nacimiento</label>
                    <input 
                      type="date"
                      name='birthDate'
                      id="birthDate"
                      className="border border-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 dark:focus:ring-primary700 dark:focus:border-primary700"
                      onChange={formik.handleChange}
                      value={formik.values.birthDate}
                    />
                    {formik.touched.birthDate && formik.errors.birthDate ? (
                      <div className='my-1 text-primaryDefault'>{String(formik.errors.birthDate)}</div>
                    ) : null}
                  </div>

                  <button  onClick={handleNext} type="button" className="w-full mt-5 text-black bg-white hover:bg-blue-800 focus:outline-primary900 focus:ring-4 focus:bg-primary900 border border-primary900 focus:text-white  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">Siguiente</button>

                </>
              )}


              {step === 4 && (

                <>
                  <div className='w-full my-4'>
                    <h2 className='mb-4 text-center font-semibold mt-3'>Crea tu contraseña</h2>
                    <p className='text-center font-medium mb-5'>Asegúrate de que sea segura</p>
                  </div>
                  <div className='flex justify-between items-center gap-5 my-8'>
                    <button onClick={handlePrevious} type="button" className="flex items-center text-blue-700 hover:underline">
                      <FaArrowLeft className="mr-2" />
                      Atrás
                    </button>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-300">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: getProgressWidth() }}></div>
                    </div>
                    <button type="submit" className="flex items-center text-blue-700 hover:underline ml-auto">
                      Crear Cuenta
                      <FaArrowRight className="ml-2" />
                    </button>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="password" className="block mb-4 text-sm font-medium text-gray-900">Contraseña</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="border border-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 dark:focus:ring-primary700 dark:focus:border-primary700"
                        placeholder="contraseña"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />

                        {showPassword ? (
                    // Ícono para ocultar contraseña
                        <FaEye className="absolute right-3 top-4 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)} />
                      ) : (
                        // Ícono para mostrar contraseña
                        <FaEyeSlash className="absolute right-3 top-4 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)} />
                      )} 
                      
                      
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                      <div className='my-1 text-primaryDefault'>{String(formik.errors.password)}</div>
                    ) : null}
                  </div>

                  <div className="mb-5">
                    <label htmlFor="confirmPassword" className="block mb-4 text-sm font-medium text-gray-900">Confirmar Contraseña</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        className="border border-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 dark:focus:ring-primary700 dark:focus:border-primary700"
                        placeholder="confirmar contraseña"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                      />
                      
                      {showPassword ? (
                    // Ícono para ocultar contraseña
                        <FaEye className="absolute right-3 top-4 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)} />
                      ) : (
                        // Ícono para mostrar contraseña
                        <FaEyeSlash className="absolute right-3 top-4 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)} />
                      )} 
                        </div>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                      <div className='my-1 text-primaryDefault'>{String(formik.errors.confirmPassword)}</div>
                    ) : null}
                  </div>
                  <PasswordRequirements password={formik.values.password} />
                  <button type="submit" className="w-full mt-5 mb-5  bg-white hover:text-black hover:bg-blue-800 focus:outline-primary900 focus:ring-4 focus:bg-primary900 border border-primary900 focus:text-white  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 ">
                    {!loading ? "Registrarse": "Cargando..."}
                  </button>

                </>
              )}
              
              
          
        </form>
      
    </div>
  );
}

