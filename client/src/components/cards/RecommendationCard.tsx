import Link from 'next/link'
import React, { useEffect } from 'react'
import Button from '../ui/Button'
import { useFinancialProfileStore } from '@/store/user/userFinanceProfile'
import { useRecommendationsStore } from '@/store/recomendations/recomendationsStore'
import { useModalStore } from '@/store/onBording/modal'
import Onbording from '../modal/Onbording/onbording'

export default function RecommendationCard() {
  const { financialProfile } = useFinancialProfileStore();
  const { recommendations, setRecommendations } = useRecommendationsStore();
  	const { modalState, openModal} = useModalStore(); 

  useEffect(() => {
    if (financialProfile && financialProfile.riskProfile) {
      setRecommendations(financialProfile.riskProfile)
    }
  }, [financialProfile, setRecommendations]); 

  return (
    <div className='flex flex-col space-y-4 bg-white50 text-white900 shadow-lg rounded-2xl p-6 lg:w-[90%] lg:mx-auto'>
		 {modalState === "Abierto" && <Onbording />}
      <div>
        <h6 className='text-h6-bold'>Recomendaciones para ti</h6>
      </div>
      <p className='text-p2-regular text-white700'>
        Descubre las mejores oportunidades de inversión que se alinean con tus metas financieras.
      </p>

      {recommendations.length > 0
	  ? recommendations.map((recommendation, index) => (
        <><div key={index} className='mt-4'>
          <h6 className='text-h6-semibold'>{recommendation.instrument}</h6>
          {recommendation.items?.map((item, subIndex) => (
            <div key={subIndex} className='flex items-center justify-between mt-4 bg-transparent'>
              <div>
                <p className='text-p1-semibold'>{item?.label}</p>
                <p className='text-p3-regular text-white700'>{item?.description}</p>
              </div>
              <div className='text-center'>
                <p className='text-p2-semibold text-white400'>
                  Crecimiento de
                  <br />
                  <span className='text-success700'> + {item?.percentage} %</span>
                </p>
              </div>
            </div>
          ))}
        </div>
		      <div className='flex items-center justify-center w-full space-x-4'>
			  <Link href={'#'} passHref className='w-full'>
				<Button size='medium' className='rounded-3xl w-full bg-accent25'>
				  Ver más
				</Button>
			  </Link>
			  <Link href={'#'} passHref className='w-full'>
				<Button size='medium' variant='outline' className='rounded-3xl w-full bg-white100 border-none shadow-sm text-white900'>
				  Editar
				</Button>
			  </Link>
			</div>
			</>
      ))
	: 
	<>
	<div className='mt-4 flex flex-col gap-4 p-3'>
		<label className="pb-2">
		<h1 className='text-p1-semibold p-1'>No tienes recomendaciones aún!</h1>
		<h1 className="text-p2-regular text-accent400 w-[70%]">No podemos brindarte recomendaciones hasta que completes el Test del Inversor</h1>
		</label>
		<Button size='medium' variant='outline' onClick={openModal}  className=' rounded-3xl w-full bg-white100 border-none shadow-sm text-white900'>
				  Test del Inversor
		</Button>
	</div>
	</>}

    </div>
  );
}
