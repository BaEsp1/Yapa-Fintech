import React from 'react';
import Button from '../ui/Button';
import Link from 'next/link';
// import CurrencySwitchBtn from '../ui/CurrencySwitchBtn';
import useWalletStore from '@/store/balance/totalbalance';
import marketStore from '@/store/market/dataMarket';

export default function BalanceCard() {

  const totalBalance = useWalletStore((state) => state.totalBalance);
  const tasaDeInteresBCRA = marketStore((state) => state.tasaDeInteres);
  
  const lastExchangeRate = tasaDeInteresBCRA.length > 0
    ? tasaDeInteresBCRA[tasaDeInteresBCRA.length - 1].valor
    : 0;

  const earning = totalBalance.deposited * lastExchangeRate/100;

  return (
    <div className='p-4 bg-white50 text-white900 shadow-lg rounded-2xl lg:w-[90%] lg:mx-auto'>
      <div className='flex flex-col space-y-6'>
        {totalBalance.total === 0 ? (
          <>
            <div className='flex justify-between items-center'>
              <p className='text-p1-bold'>Retorno de inversión</p>
              {/* <CurrencySwitchBtn /> */}
            </div>
            <div className='space-y-3'>
            { totalBalance.deposited !== 0 
            ? (<h2 className="text-h3-semibold">{totalBalance.deposited}</h2>)
            : (<h3 className='text-p1-regular text-accent400 pb-3 '>Ingresá dinero para comenzar</h3>)
            }
              <p className='text-p1-regular text-white600'>
                <span className='text-success700'> + %{lastExchangeRate} </span> en 12 meses
              </p>
            </div>
			<Link href={'/app/home/investment'} className=' flex items-center justify-center'>
            <Button size='medium' variant='solid' className='rounded-3xl w-[90%] '>
              Ingresar
            </Button>
          </Link>
          </>
        ) : (
          <>
            <div className='flex justify-between items-center'>
              <p className='text-p1-bold'>Retorno de inversión</p>
              {/* <CurrencySwitchBtn /> */}
            </div>
            <div className='space-y-3'>
              <h3 className='text-h3-bold'>$ {totalBalance?.deposited?.toLocaleString()}</h3>
              <p className='text-p1-regular text-white600'>
                <span className='text-success700'> + $ {earning.toLocaleString()}</span> en 12 meses
              </p>
            </div>

        <div className='flex justify-center space-x-2 w-full'>
          <Link href={'/app/home/investment'} className='w-1/2'>
            <Button size='medium' variant='solid' className='rounded-3xl w-full'>
              Ingresar
            </Button>
          </Link>
          <Link href={'/app/home/transfer'} className='w-1/2'>
            <Button size='medium' variant='outline' className='rounded-3xl w-full bg-white100 border-none text-white900'>
              Retirar
            </Button>
          </Link>
        </div>
		</>
        )}
      </div>
    </div>
  );
}
