'use client'
import Button from '@/components/ui/Button'
import React, { useState } from 'react'

export default function TabLayout() {

	const [activeTab, setActiveTab] = useState<'portfolio' | 'movements'>('portfolio')


	return (
		<div className='p-4'>
			{/* Switch Tab Buttons */}
			<div className='flex mb-5'>
				<Button
					variant='outline'
					className={`mr-3 ${activeTab === 'portfolio' ? 'font-bold' : 'font-normal'}`}
					onClick={() => setActiveTab('portfolio')}
				>Portafolio
				</Button>
				<Button
					variant='outline'
					className={`mr-3 ${activeTab === 'movements' ? 'font-bold' : 'font-normal'}`}
					onClick={() => setActiveTab('movements')}
				>Movimientos
				</Button>
			</div>

			{/* Portfolio content */}
			{activeTab === 'portfolio' && (
				<div>
					<h2 className="text-xl font-bold mb-2">Retorno de inversión</h2>
					<p className="text-lg">$10.250,45</p>
					<p className="text-sm text-green-600">+ $971,29 en 12 meses.</p>

					<h3 className="text-lg font-bold mt-4">Composición del portafolio</h3>
					<p className="text-sm mb-4">Descubre el origen del aumento de tu retorno de inversión.</p>

					<h4 className="font-bold">Bonos</h4>
					<p className="text-sm">Los bonos son decida. Al comprarlos, el inversionista presta dinero.</p>
					<p className="text-sm">Fondo: PR13.Bx Trasa Badler</p>
					<p className="text-sm">Distribución: 38,9%</p>

					<h4 className="font-bold mt-4">Acciones</h4>
					<p className="text-sm">Las acciones son propiedad de una empresa. Al comprarlas, el inversionista es accionista.</p>
					<p className="text-sm">Fondo: DSK.BA DeepSeek Inc.</p>
					<p className="text-sm">Distribución: 23%</p>
				</div>
			)}

			{/* Contenido de la pestaña Movimientos */}
			{activeTab === 'movements' && (
				<div>
					<h2 className="text-xl font-bold mb-2">Activos</h2>
					<p className="text-sm mb-4">En esta sección, encontrarás un resumen oceánico sobre cómo se están comportando los activos en los que han invertido, incluyendo tendencias y análisis de mercado.</p>

					<table className="w-full mb-4">
						<thead>
							<tr>
								<th className="text-left">Apple Inc.</th>
								<th className="text-left">Tesla Inc.</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>$145.00</td>
								<td>$688.99</td>
							</tr>
							<tr>
								<td className="text-green-600">+1.2%</td>
								<td className="text-green-600">+0.8%</td>
							</tr>
						</tbody>
					</table>

					<p className="text-sm">Amazon Inc. $3,334.69</p>
					<p className="text-sm">Alphabet Inc. $2,450.00</p>
				</div>
			)}

		</div>
	)
}
