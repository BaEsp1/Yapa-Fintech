'use client';
import { FavoriteBorder, Groups2Outlined } from "@mui/icons-material";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useState } from "react";
import { ModalInvestement } from "../modal/investment/ModalInvestement";
import { InstrumentProps } from "./GeneralInformation";

export const InvestmentCard = ({ id, market , moneyWallet ,usd}: InstrumentProps) =>{
    const instrument = market.flat().find(item => item.meta.symbol === id);
    const [modal , setModal] = useState(false)
    const [inversionData , setInversionData] = useState({
        price:0,
        currency:"",
        symbol:"",
        usd: 0,
        moneyWallet: 0
    })

    const handleOpenModal =()=>{
        setInversionData({
            price: instrument?.body[instrument.body.length - 1].close || 1 ,
            currency:instrument?.meta.currency || "ARS" ,
            symbol:instrument?.meta.symbol || "",
            usd: usd || 0,
            moneyWallet: moneyWallet || 0
        })
        setModal(true)
    }
    const handleCloseModal =()=>{
        setModal(false)
    }


    return(
    <div className="flex flex-col h-[10em] w-full gap-2 p-2">
        { modal && <ModalInvestement inversionData={inversionData} onClose={handleCloseModal}/> }
                    <Button variant="solid" className="p-2 w-[90%] text-h6-medium rounded-full mx-auto bg-accent400"
                    onClick={handleOpenModal}>Invertir</Button>
            <div className="flex flex-row gap-4 w-[90%] mx-auto text-white700 ">
                <Button className=" flex gap-2 bg-white100 rounded-full p-2 w-full text-p1-medium" size="medium">
                    <FavoriteBorder className="text-white500"/>
                    Guardar
                </Button>
                <Link href="/app/community" className="w-full">
                    <Button className="text-p1-medium bg-white100 rounded-full p-2 w-full flex gap-2" size="medium">
                        <Groups2Outlined className="text-white500"/>
                        Comunidad
                    </Button>
                </Link>
            </div>
    </div>)
}