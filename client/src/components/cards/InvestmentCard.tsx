'use client';
import { FavoriteBorder, Groups2Outlined } from "@mui/icons-material";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useState } from "react";
import { ModalInvestement } from "../modal/investment/ModalInvestement";
import { InstrumentProps } from "./GeneralInformation";
import { Portfolio } from "@/store/portfoil/portfoilStore";
import { ModalSell } from "../modal/investment/ModalSell";

export const InvestmentCard = ({ id, market , moneyWallet ,usd , portfoil}: InstrumentProps) =>{
    const instrument = market.flat().find(item => item.meta.symbol === id);
    const [modalInvest , setModalInvest] = useState(false)
    const [modalSell, setModalSell] = useState<Portfolio | null>(null);
    const bonos = market[0];
    const [inversionData , setInversionData] = useState({
        price:0,
        currency:"",
        symbol:"",
        name:"",
        type:"",
        usd: 0,
        moneyWallet: 0
    }) 

    const isInstrumentInPortfolio = (symbol: string) => {
        const instrumentTypes: ('Bono' | 'cedears')[] = ['Bono', 'cedears'];
        if (portfoil) {
            const instrumentFound = instrumentTypes
                .map(type => portfoil[type]?.find(item => item.object[0] === symbol)) 
                .find(instrument => instrument !== undefined) || null; 
            return instrumentFound; 
        }
        return null; 
    };
    
    const type = bonos.some(item => item.meta.symbol === instrument?.meta.symbol) ? "Bono" : "Cedear";
    const handleOpenModalInvest =()=>{
    
        setInversionData({
            price: instrument?.body[instrument.body.length - 1].close || 1 ,
            currency:instrument?.meta.currency || "ARS" ,
            name:instrument?.meta.longName || "" ,
            symbol:instrument?.meta.symbol || "",
            usd: usd || 0,
            type: type,
            moneyWallet: moneyWallet || 0
        })
        setModalInvest(true)
    }

    const handleOpenModalSell =()=>{
        setInversionData({
            price: instrument?.body[instrument.body.length - 1].close || 1 ,
            currency:instrument?.meta.currency || "ARS" ,
            name:instrument?.meta.longName || "" ,
            symbol:instrument?.meta.symbol || "",
            usd: usd || 0,
            type: type,
            moneyWallet: moneyWallet || 0
        })
        const instrumentFromPortfolio = isInstrumentInPortfolio(instrument?.meta.symbol || "");
        if (typeof instrumentFromPortfolio === "object" && instrumentFromPortfolio !== null) {
            setModalSell(instrumentFromPortfolio);
        } else {
            console.log("Instrumento no encontrado en el portafolio.");
        }
    }

    const handleCloseModalInvest =()=>{
        setModalInvest(false)
    }
    const handleCloseModalSell =()=>{
        setModalSell(null)
    }


    return(
    <div className="flex flex-col h-[10.7em] w-full gap-2 px-2 ">
        { modalInvest && <ModalInvestement inversionData={inversionData} onClose={handleCloseModalInvest}/> }
        {modalSell && modalSell !== null && <ModalSell inversionData={inversionData} instru={modalSell} onClose={handleCloseModalSell} usd={usd}/> }
        {isInstrumentInPortfolio(instrument?.meta.symbol || "") 
        ? < div className="flex flex-rown gap-4 p-2 w-full" >
            <Button variant="basic"  className="p-2 w-full text-h6-medium rounded-full mx-auto shadow"onClick={handleOpenModalSell} >
                Vender</Button>
            <Button variant="solid" className="p-2 w-full text-h6-medium rounded-full mx-auto shadow"onClick={handleOpenModalInvest}>
            Invertir</Button>
            </div>
        : <Button variant="solid" className="p-2 w-[90%] text-h6-medium rounded-full mx-auto bg-accent400"
                    onClick={handleOpenModalInvest}>
                        Invertir
                        </Button>}
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