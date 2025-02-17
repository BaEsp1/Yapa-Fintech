'use client';
import { useState } from 'react'
import { ExpandMore } from '@mui/icons-material'
import DonutChart from '@/components/graphs/donnutChart'

interface Fund {
  name: string
  value:number
  distribution: number
}

interface CollapsibleSectionProps {
  category: string
  funds: Fund[]
}

export default function CollapsibleSection({
  category,
  funds,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const totalDistribution = funds.reduce((total, fund) => total + fund.distribution, 0)

  const percentageDistribution = parseFloat(totalDistribution.toFixed(1))
  const remainingPercentage = 100 - percentageDistribution 

  const remainingDistribution= parseFloat(remainingPercentage.toFixed(1))

  return (
    <div className='bg-white shadow-md rounded-lg w-full'>
      {/* Contenedor Principal */}
      <button
        className='w-full flex items-center gap-4 focus:outline-none'
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='relative w-16 h-16'>
		<DonutChart data={[percentageDistribution ,remainingDistribution]} percentage={percentageDistribution}/>
        </div>

        {/* Información */}
        <div className='flex flex-col items-start text-left flex-grow text-white800'>
          <h6 className='text-h6-semibold '>{category}</h6> {/* Aquí usamos category */}
        </div>

        {/* Icono Expandir */}
        <ExpandMore
          className={`transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {/* Contenido desplegable */}
      {isOpen && (
        <div className='bg-primary25 p-2  rounded-lg'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b'>
                <th className='text-left text-p2-regular'>Fondo</th>
                <th className='text-right text-p2-semibold'>Distribución</th>
              </tr>
            </thead>
            <tbody>
              {funds.map((fund, index) => (
                <tr key={index} className='border-b'>
                  <td className='py-2 text-p1-regular'>{fund.name}</td>
                  <label className="flex justify-end gap-2">
                  <td className='py-2 text-p1-regular text-white400'>$ {fund.value.toFixed(1)}</td>
                  <td className='py-2 text-right text-p1-semibold'>  {fund.distribution.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 2 }) + ' %'}</td>
                  </label>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
