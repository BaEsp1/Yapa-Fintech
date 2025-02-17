'use client';
import { ArrowLargeLeft } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import marketStore from "@/store/market/dataMarket";
import { GeneralInformationInstrument } from "@/components/cards/GeneralInformation";
import { PerformanceInstrument } from "@/components/cards/PerformanceIntrument";
import { InvestmentCard } from "@/components/cards/InvestmentCard";
import useWalletStore from "@/store/balance/totalbalance";
import Loading from "@/components/animations/Loader/loader";

export default function DetailInstruments () {
    const loadAllVariablesData = marketStore((state) => state.loadAllVariablesData);
    const loadBalanceData = useWalletStore((state) => state.loadBalanceData);
    const params = useParams();
    const [id, setId] = useState<string>("");
    const moneyWallet = useWalletStore((state) => state.totalBalance.deposited);
    const changeArsToUsd = marketStore((state) => state.tipoCambioMinorista);
    const bonos = marketStore((state) => state.bonos);
    const actions = marketStore((state) => state.cedears);
    const market = [bonos, actions];
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.id) setId(String(params.id));
        
        setLoading(true);
        loadAllVariablesData();
        loadBalanceData();
        
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); 

        return () => clearTimeout(timer); 
    }, [params.id]);

    const usd = changeArsToUsd[changeArsToUsd.length - 1]?.valor || 1120;

    if (loading) {
        return (
          <main className="px-4 pt-6 pb-24 w-full h-min-screen text-white900">
                <Loading/>
          </main>
        );
      }

    return (
        <main className="flex flex-col p-4">
            <section className="flex flex-col p-4 justify-center">
                <div>
                    <Link href="/app/portfolio" className="flex flex-row gap-3">
                        <Image src={ArrowLargeLeft} alt="" />
                        <h1 className="text-h6-bold text-900 p-2">{id}</h1>
                    </Link>
                </div>
                <p className="text-p2-regular text-white700 pt-4">
                    Aquí encontrarás más detalles sobre el instrumento seleccionado
                </p>
            </section>
            <section className="flex w-full m-auto">
                <GeneralInformationInstrument id={id} market={market} />
            </section>
            <section className="flex w-full m-auto">
                <PerformanceInstrument id={id} market={market} />
            </section>
            <section>
                <InvestmentCard id={id} market={market} moneyWallet={moneyWallet} usd={usd} />
            </section>
        </main>
    );
}
