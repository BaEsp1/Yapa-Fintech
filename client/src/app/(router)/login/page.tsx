"use client";
import FormLogin from "@/components/forms/FormLogin";
import FormRegister from "@/components/forms/FormRegister";
import { useState } from "react";

export default function Login() {
    const [visual, setVisual] = useState ("Registro")

    const handleSelectRegister = ()=>{
        setVisual("Registro")
    }

    const handleSelectLogin = ()=>{
        setVisual("Ingreso")
    }
    return(
        <main>
            <section className="p-2">
            <div> 
                <h2 className='mb-4 text-center font-semibold mt-3'>Bienvenido a Yapa</h2>
                <p className='text-center font-medium mb-5'>{visual === "Ingreso" ? "Iniciá Sesión con tu cuenta" : "Creá tu cuenta y empecemos"}</p>
            </div>

                <div className="flex flex-row justify-center gap-3 mb-4">
                    <button 
                    className={`w-[40%] px-4 text-center py-2 border-b-2  hover:text-blue-500 ${visual === "Registro" ? "text-accent400 border-primary800" : "text-white900 border-white300"}`}
                    onClick={handleSelectRegister}
                    >Registro
                    </button>
                    
                    <button 
                    className={`w-[40%] px-4 text-center py-2 border-b-2  hover:text-blue-500 ${visual === "Ingreso" ? "text-accent400 border-primary800" : "text-white900 border-white300"}`}
                    onClick={handleSelectLogin}
                    >
                    Ingreso
                    </button>
                </div>

            </section>
            <section>
                {visual === "Registro" 
                ? <FormRegister/>
                : <FormLogin/>
            }
            </section>
        </main>
    )
}