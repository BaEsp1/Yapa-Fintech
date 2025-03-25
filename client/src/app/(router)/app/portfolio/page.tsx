'use client'

import { ArrowBackIos, SettingsSuggest } from '@mui/icons-material'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import CollapsibleSection from "@/components/cards/CollapsibleSection"
import AssetList ,{Asset}from '@/components/cards/AssetList'
import MarketSection from '@/components/cards/MarketSection'
import OperationsHistory from '@/components/cards/OperationsHistory'
import usePortfoilStore from '@/store/portfoil/portfoilStore'
import marketStore from '@/store/market/dataMarket'
import { FinancialData } from '@/store/market/dataMarket'
import Loading from '@/components/animations/Loader/loader'
import TotalCard from '@/components/cards/totalCard'
import useOperationsStore from '@/store/operations/operations'
import useWalletStore from '@/store/balance/totalbalance'

export default function Portfolio() {
	const [activeTab, setActiveTab] = useState<'portfolio' | 'movements'>('portfolio')
  const { portfolios , fetchPortfolios} = usePortfoilStore();
  const [bonos, setBonos] = useState<FinancialData[]>([]);
  const [cedears, setCedears] = useState<FinancialData[]>([]);
  const [loading, setLoading] = useState(true);  
  const loadAllVariablesData = marketStore((state) => state.loadAllVariablesData);
  const bonosMKT = marketStore((state)=> state.bonos)
  const accionesMKT = marketStore((state)=> state.cedears)
  const loadOperations = useOperationsStore((state) => state.loadOperations);
  const operations = useOperationsStore((state) => state.operations);
  const totalInvestments = useWalletStore((state)=>state.totalBalance.invested)
  const loadBalance = useWalletStore((state)=>state.loadBalanceData)
  let mappedAssets : Asset[] = []

  // console.log(portfolios)
  useEffect(() => {

    if(loading){
    loadAllVariablesData();
    fetchPortfolios();
    loadBalance()
    loadOperations()
    setBonos(bonosMKT)
    setCedears(accionesMKT)
    setLoading(false); 
        }
  }, []);


  if (loading) {
    return (
      <main className="px-4 pt-6 pb-24 w-full h-min-screen text-white900">
            <Loading/>
      </main>
    );
  }


  const investments = [
    {
      title: 'Bonos',
      description: 'Los bonos son deuda. Al comprarlos, el inversionista presta dinero.',
      funds: Object.entries(portfolios?.Bono || {}).map(([key, portfolio]) => {
        const value = portfolio.quantity * portfolio.purchasePrice;
        return {
          key,
          name: portfolio.object[0],
          value: value, 
        };
      })
    },
    {
      title: 'Acciones',
      description: 'Las acciones son propiedad de una empresa. Al comprarlas, el inversionista es accionista.',
      funds: Object.entries(portfolios?.Acciones || {}).map(([key, portfolio]) => {
        const value = portfolio.quantity * portfolio.purchasePrice;
        return {
          key,
          name: portfolio.object[0],
          value: value, 
        };
      })
    }
  ];

  const totalBonos = investments[0].funds.reduce((total, fund) => total + fund.value, 0);
  const totalAcciones = investments[1].funds.reduce((total, fund) => total + fund.value, 0);


  const updatedInvestments = investments.map((investment) => {

    return {
      ...investment,
      funds: investment.funds.map(fund => ({
        ...fund,
        distribution: (fund.value / totalInvestments) * 100
      }))
    };
  });

  if (portfolios) {
    mappedAssets = [
      ...(portfolios?.Bono?.length ? portfolios.Bono.map((item) => ({
        name: item.object[0],
        price: item.purchasePrice,
        change: '0',
        trend: 'neutral',
        quantity: item.quantity,
        historicalData: []
      })) : []),
      ...(portfolios?.Acciones?.length ? portfolios.Acciones.map((item) => ({
        name: item.object[0],
        price: item.purchasePrice,
        change: '0',
        trend: 'neutral',
        quantity: item.quantity,
        historicalData: []
      })) : []),
    ];
  } else {
    mappedAssets = [];
  }

  return (
    <main className="px-4 pt-6 pb-24 w-full h-min-screen text-white900">
      <div className='flex flex-col space-y-12'>
        {/* Header */}
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <Link href={'/app/home'}>
              <ArrowBackIos />
            </Link>
            <h6 className='text-h6-bold ml-2'>Portafolio</h6>
          </div>
          {/*<Link href={'/app/settings'}>
          </Link>*/}
            <SettingsSuggest />
        </div>
        <div className='mx-auto'>
          <p className='text-p2-regular'>Ideal para decisiones estratégicas</p>
        </div>

        {/* Switch Layout Content */}
        <div className='p-4'>
          <div className='flex items-center mb-5 space-x-2'>
            <Button
              variant='text'
              size='medium'
              className={`border-b-2 w-full ${activeTab === 'portfolio' ? 'border-accent400 text-accent400' : 'border-white700 text-white700'} `}
              onClick={() => setActiveTab('portfolio')}>
              Portafolio
            </Button>
            <Button
              variant='text'
              size='medium'
              className={`border-b-2 w-full ${activeTab === 'movements' ? 'border-accent400 text-accent400 ' : 'border-white700 text-white700'} `}
              onClick={() => setActiveTab('movements')}>
              Movimientos
            </Button>
          </div>

          <TotalCard  total={totalInvestments}  bonds={totalBonos} asset={totalAcciones} />
          {/* Portfolio Content */}
          {activeTab === 'portfolio' && (
            <div>
              <div className='p-8 space-y-4'>
                <h5 className='text-h5-semibold'>Composición de portafolio</h5>
                <p className='text-p1-regular text-white700'>Descubre el origen del aumento de tu retorno de inversión.</p>
              </div>

              { (portfolios?.Bono?.length > 0 || portfolios?.Acciones?.length > 0) ?
              <>
              <div className='p-4 space-y-8'>
                {updatedInvestments.map((investment, index) => (
                    <CollapsibleSection
                      key={index}
                      category={investment.title}
                      funds={investment.funds}
                    />
                  ))}
              </div>

              <AssetList assets={mappedAssets} bonos={bonos} cedears={cedears}/>
              </>
                : (<h3 className='text-p1-regular text-accent400 px-6  '>Animáte a invertir!</h3>)
              }

              <MarketSection bonos={bonos} cedears={cedears} />
            </div>
          )}

          {/* Movements Content */}
          {activeTab === 'movements' && (
            <div>
              <OperationsHistory operations={operations}/>
            </div>
          )}
        </div>
      </div>
    </main>
  );

}
