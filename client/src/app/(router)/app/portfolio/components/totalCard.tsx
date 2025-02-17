import CurrencySwitchBtn from '@/components/ui/CurrencySwitchBtn'
import React from 'react'

interface InvestmentCardProps {
	total:number
	asset:number
	bonds:number
}

export default function TotalCard({ total, bonds, asset }: InvestmentCardProps) {
	return (
		<div className='flex flex-col justify-start space-y-4 p-8 shadow-xl rounded-lg'>
			<div className='flex justify-between items-center'>
				<p className='text-p1-bold'>Dinero invertido</p>
				<CurrencySwitchBtn />
			</div>
			<div className='space-y-2'>
				<label>Total</label>
				<h3 className='text-h3-bold'>$ {total.toLocaleString()}</h3>
			</div>
			<div className="flex flex-row justify-between p-2">
			<label>Invertido en Bonos<h3 className='text-h5-semibold'>$ {bonds.toLocaleString()}</h3></label>
			<label>Invertido en Acciones<h3 className='text-h5-semibold'>$ {asset.toLocaleString()}</h3></label>

			</div>

		</div>
	)
}
