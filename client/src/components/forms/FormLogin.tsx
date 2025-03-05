'use client';
import React, { useState} from 'react';
import { useFormik } from 'formik';
// import * as Yup from 'yup';
import { redirect, useRouter } from 'next/navigation'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Cookies from 'js-cookie';
import { FcGoogle } from 'react-icons/fc';
import { fetchLoginUser } from '@/utils/FetchLoginUser';
import Swal from 'sweetalert2';

const URL = process.env.NEXT_PUBLIC_API_URL 

export default function FormLogin() {
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  
  // const validationSchema = Yup.object({
  //   email: Yup.string()
  //     .email('Ingrese un email válido')
  //     .required('El email es requerido'),
  //   password: Yup.string()
  //     .min(8, 'La contraseña debe tener al menos  8 caracteres')
  //     .max(15,"la contraseña debe ser igual o menor a 12 caracteres")
  //     .required('La contraseña es requerida'),
  // });

  const formik = useFormik({
    initialValues:{ 
      email: Cookies.get("userEmail") || "",
      password: "",
    },
    // validationSchema,
    onSubmit: async  (values, {resetForm}) => {
      setLoading(true);

      const { email, password } = values;
      if (rememberMe) {
        Cookies.set('userEmail', values.email, {
          secure: true,
          sameSite: 'strict',
          expires: 7, // Duración de la cookie en días
        });
      }

      const dataForLoginUser = {
        email: email,
        password: password,
      };
          
      try {
        const response = await fetchLoginUser(dataForLoginUser);
        console.log(response)
        
        if (response.success === true) {
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
            expires: 7, // Duración de la cookie en días
          });
          setLoading(false);
          resetForm();
          router.push("/app/home");
          return;
        } 
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema con el inicio de sesion. Email o contraseña incorrecta',
          showConfirmButton: true,
        });
      }
    },
  });

  const loginGoogle = () =>{
    redirect(`${URL}/oauth2/authorization/google`)
  }

  return (
    <section className='mb-20 sm:w-[400px] md:w-[400px] lg:w-[400px] xl:w-[400px] mx-auto bg-white  rounded-lg'>
      
      
        <form
          onSubmit={formik.handleSubmit}
          className=' text-black  '
        >
          
            <>
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
                        <div className='my-1 text-p2-semibold text-accent400'>{String(formik.errors.email)}</div>
                  ) : null}
                    
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
                                  
                  <FaEye className="absolute right-3 top-4 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)} />
                  ) : (
                                      // Ícono para mostrar contraseña
                  <FaEyeSlash className="absolute right-3 top-4 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)} />
                  )} 
                                    
                                    
                  </div>
                  {formik.touched.password && formik.errors.password ? (
                    <div className='my-1 text-p2-semibold text-accent400'>{String(formik.errors.password)}</div>
                  ) : null}
              <div className='flex justify-between items-center mt-4'>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    id='remember'
                    className='form-checkbox mr-2 text-gray700'
                    onChange={()=>{setRememberMe(!rememberMe)}}
                    checked={rememberMe}
                  />
                  <label htmlFor='remember' className=''>Recordarme</label>
                </div>

                
              </div>
                </div>

                  <button   type="submit" className="w-full  text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:bg-primary400  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                    {!loading ? "Iniciar Sesión": "Cargando..."}
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

            </>
          
        </form>
    </section>
  );
}