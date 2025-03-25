import CurrencySwitchBtn from '@/components/ui/CurrencySwitchBtn'
import React from 'react'

interface InvestmentCardProps {
	title: string
	amount: number
	earning: number
}

export default function InvestmentCard({ title, amount, earning }: InvestmentCardProps) {
	return (
		<div className='flex flex-col justify-start space-y-4 p-8 shadow-sm rounded-lg'>
			<div className='flex justify-between items-center'>
				<p className='text-p1-bold'>{title}</p>
				<CurrencySwitchBtn />
			</div>
			<div className='space-y-2'>
				<h3 className='text-h3-bold'>$ {amount.toLocaleString()}</h3>
				<p className='text-p1-regular'><span className='text-success700 text-p1-bold'> + $ {earning.toLocaleString()}</span> en 12 meses.</p>
			</div>
		</div>
	)
}
