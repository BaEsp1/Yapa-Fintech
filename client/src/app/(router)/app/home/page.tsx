"use client"
import BalanceCard from "@/components/cards/BalanceCard";
import GoalCard from "@/components/cards/GoalCard";
import { useEffect } from 'react';
import RecommendationCard from '@/components/cards/RecommendationCard';
// import getUserProfile from '@/utils/financialProfile/getProfile';
import Onbording from '@/components/modal/Onbording/onbording';
import FinancialSampleCard from '@/components/cards/FinancialSampleCard';
import { useFinancialProfileStore } from "@/store/user/userFinanceProfile";
import getUserData from "@/utils/getUserData";
import { useModalStore } from "@/store/onBording/modal";
import marketStore from "@/store/market/dataMarket";
import { getPortfolios } from "@/utils/portfoil/getPortfoil";
import {  StorageRounded } from "@mui/icons-material";

export default function Home() {
  const { modalState} = useModalStore();
    const loadAllVariablesData = marketStore((state) => state.loadAllVariablesData);
    const financialProfile = useFinancialProfileStore(state => state.financialProfile);
    
    useEffect(() => {
    // const fetchProfile = async () => {
    //   const { profileData } = await getUserProfile();

    //   if (!profileData && modalState !== "Abierto") {
    //     openModal();
    //   } else {
    //     closeModal();
    //   }
    // };
    loadAllVariablesData();
    getPortfolios()
    // fetchProfile();
    getUserData();
  }, []);


  const financialData = [
    {
      title: 'Ingresos',
      icon: '/img/MoneyBag.png',
      value: financialProfile?.incomeMonthly || 0,
      path: '/details/incomes'
    },
    {
      title: 'Gastos',
      icon: '/img/MoneyWings.png',
      value: financialProfile?.expensesMonthly || 0,
      path: '/details/expenses'
    },
    {
      title: 'Capacidad de ahorro',
      icon: '/img/ClappingHands.png',
      value: financialProfile?.percentageSave || 0,
      path: '/details/savings'
    },
    {
      title: 'Total de deudas',
      icon: '/img/FlagInHole.png',
      value: 0,
      path: '/details/debts'
    }
  ]


  return (
    <main className="px-4 pt-6 pb-24 space-y-4 w-full bg-white50">
      {modalState === "Abierto" && <Onbording />}
      <BalanceCard/>

      {/* Financial samples */}
      <div className='flex flex-col p-4 bg-white50 shadow-lg rounded-2xl space-y-6 lg:w-[90%] lg:mx-auto'>
        <div className="flex flex-col space-y-6">
          <div className='flex items-center space-x-2'>
            <StorageRounded className='text-accent300'/>
            <h6 className='text-h6-bold'>Finanzas</h6>
          </div>
          <p className="text-p2-regular text-white700">Obtén una vista previa, rápida y completa de cómo manejas tus finanzas, incluyendo tus ingresos, gastos, ahorros y deudas.</p>
        </div>
        <div className='flex flex-wrap gap-4 justify-between'>
          {financialData 
          ?
          financialData.map((data, index) => (
            <FinancialSampleCard
              key={index}
              title={data.title}
              value={data.value}
              path={data.path}
            />
          )
          ) 
          :<div>
            <h1>Para poder obtener una mejor experiencia , debes realizar el Test del Inversor</h1>
          </div>
        }

        </div>
      </div>

      <GoalCard />
      <RecommendationCard />
    </main>
  );
}
