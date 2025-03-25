"use client";
import { ArrowLargeLeft } from "@/assets"
// import Button from "@/components/ui/Button";
import {  ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"
import Image from "next/image"
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Transfer () {

    const [visual , setVisual] = useState("Index")

    const handleChangeToTransfer = ()=>{
        setVisual("Transfers")
    }

    const handleChangeToIndex = ()=>{
        setVisual("Index")
    }

    const handleAviso = ()=>{
         Swal.fire({
                title: '¡Próximamente!',
                text: 'Proxímamente se incorporaremos Wallet Digital',
                icon: 'info',
                confirmButtonText: 'Aceptar'
            })
        return
    }

    return (
        <main className="p-2 w-full">
                    <Link href="/app/home">
                        <button className="flex flex-row gap-3 p-2">
                            <Image src={ArrowLargeLeft} alt=""/>
                            <h1 className="text-h6-bold text-white900">Retiro</h1>
                        </button>
                    </Link>
                    <p className="text-p2-regular text-center p-3">Retira tus ganancias</p>
                    <h1 className="text-h5-semibold p-4">Métodos de retiro</h1>
                    <h2 className="text-p2-regular p-2 pb-4">Desde aqui podras retirar tus fondos de la aplicación</h2>
                    {visual === "Index" ?
                        <div className="flex flex-col gap-3 p-3">
                            <button className="flex flex-row justify-between" onClick={handleChangeToTransfer}>
                                <h2 className="text-p1-regular">Transferencias bancarias</h2>
                                <ArrowForwardIos fontSize="small"/>
                            </button>
                            <button className="flex flex-row justify-between opacity-50" onClick={handleAviso}>
                                <h2 className="text-p1-regular">Wallet digital (Próximamente)</h2>
                                <ArrowForwardIos fontSize="small"/>
                            </button>
                        </div>
                        : <>
                            <button  className="float-right p-2" onClick={handleChangeToIndex}>
                                <ArrowBackIos/>
                            </button>

                        <div className="flex flex-col gap-5 p-3 w-full">
                            <h2 className="text-h6-regular">Transfiere tu dinero</h2>

                            <input 
                            type="text" 
                            placeholder="Busca CBU , CVU o Alias"
                            className="p-2 border boder-white300 shadow-lg w-[50%] rounded-lg"/>

                            <div className="p-2 mt-5 flex flex-col gap-4 bg-primary100 rounded-lg shadow-lg ">
                                <h1 className="text-h6-medium">Mis cuentas</h1>
                                <p className="px-2 text-p2-regular">Aún no has guardado ninguna cuenta.</p>
                            </div>

                            <div className="p-2 flex flex-col gap-4 bg-primary100 rounded-lg shadow-lg ">
                                <h1 className="text-h6-medium">Otras cuentas</h1>
                                <p className="px-2 text-p2-regular">Cuando hayas transferido a otros aparecen aqui!</p>
                            </div>


                        </div>
                        </>
                        }
        </main>
    )
}