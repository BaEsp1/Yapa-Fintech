"use client";
import { ArrowLargeLeft } from "@/assets"
import { CardDataInvestment } from "@/components/cards/CardDataInvestment";
import Button from "@/components/ui/Button";
import { updateDepositedAmount } from "@/utils/balance/FetchBalance";
import {  ArrowForwardIos } from "@mui/icons-material"
import Image from "next/image"
import { redirect } from "next/navigation";
import { useState } from "react";

function Investment (){

    const [data, setData] = useState("");

    const handleChangeTransferencia = () =>{
        setData("Transferencia")
    }

    const handleChangeWallet = () =>{
        setData("Wallet")
    }

    const handleHome = () =>{
        redirect('/app/home')
    }
    const handleClose = () =>{
        setData("")
    }

    const handleMoneyFree = () =>{
        updateDepositedAmount(100000)
        //falta crear el enpoind en backend e incorporar la logica de implementacion del div balance === 0 ...
    }

    return(<>
    <main className="p-3 pt-4">
        {data !== "" && (
                        <CardDataInvestment data={data} onClose={handleClose}/>
                )}
        {data === "" && 

        <section >
            <button className="flex flex-row gap-3 p-2" onClick={handleHome}>
                <Image src={ArrowLargeLeft} alt=""/>
                <h1 className="text-h6-bold text-white900">Invertir</h1>
            </button>

            <p className="text-p2-regular text-center p-3">Ideal para decisiones tácticas</p>
            <h1 className="text-h5-semibold p-4">Métodos de pago</h1>
            <h2 className="text-p2-regular p-2 pb-4">Desde aqui podras invertir y añadir tus fondos a la aplicación</h2>
                <div className="flex flex-col gap-3 p-3">
                    <button className="flex flex-row justify-between" onClick={handleChangeTransferencia}>
                        <h2 className="text-p1-regular">Transferencias bancarias</h2>
                        <ArrowForwardIos fontSize="small"/>
                    </button>
                    <button className="flex flex-row justify-between opacity-50" onClick={handleChangeWallet}>
                        <h2 className="text-p1-regular">Wallet digital (Próximamente)</h2>
                        <ArrowForwardIos fontSize="small"/>
                    </button>
                </div>

                <div className=" bg-primary400 flex flex-col justify-center gap-2 items-center text-white  text-center w-[50%] mx-auto p-2 mt-32 rounded-lg shadow-lg">
                    <h2 className="text-h6-semibold">¿Sos nuevo en Yapa?</h2>
                    <p className="text-p1-semibold">Podemos prestarte $100.000!</p>
                    <p className="text-p2-semibold">De esta manera podrás experimentar en <strong className="text-accent400">Yapa</strong></p>

                    <Button variant="basic" size="medium" onClick={handleMoneyFree}> Si Quiero!</Button>
                </div>
            </section>}
        </main>
    </>)
}

export default Investment