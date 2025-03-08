"use client";
import { ArrowLargeLeft } from "@/assets"
// import Button from "@/components/ui/Button";
import {  ArrowForwardIos } from "@mui/icons-material"
import Image from "next/image"
import Link from "next/link";

export default function Transfer () {

    return (
        <main>
        <section  className="p-2">
                    <Link href="/app/home">
                        <button className="flex flex-row gap-3 p-2">
                            <Image src={ArrowLargeLeft} alt=""/>
                            <h1 className="text-h6-bold text-white900">Retiro</h1>
                        </button>
                    </Link>
        
                    <p className="text-p2-regular text-center p-3">Retira tus ganancias</p>
                    <h1 className="text-h5-semibold p-4">Métodos de retiro</h1>
                    <h2 className="text-p2-regular p-2 pb-4">Desde aqui podras retirar tus fondos de la aplicación</h2>
                        <div className="flex flex-col gap-3 p-3">
                            <button className="flex flex-row justify-between">
                                <h2 className="text-p1-regular">Transferencias bancarias</h2>
                                <ArrowForwardIos fontSize="small"/>
                            </button>
                            <button className="flex flex-row justify-between opacity-50">
                                <h2 className="text-p1-regular">Wallet digital (Próximamente)</h2>
                                <ArrowForwardIos fontSize="small"/>
                            </button>
                        </div>
                    </section>
        </main>
    )
}