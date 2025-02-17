import React from 'react'
import Button from '../ui/Button'
import { AirplaneTicketOutlined, Savings, DirectionsCarOutlined, CottageOutlined } from '@mui/icons-material'
import Link from 'next/link'
import Image from 'next/image'
import { useGoalStore } from '@/store/goal/goalStore'
import { SkipUser } from '@/assets'

const modeConfig = {
  saving: {
    icon: <CottageOutlined className='text-accent300' />,
    text: '¡Casi listo!',
    image: '/img/ProgressCircle.png',
    imageSize: { width: 50, height: 50 },
  },
  pleasure: {
    icon: <AirplaneTicketOutlined className='text-accent300' />,
    text: 'Eres del 1% en esta meta',
    image: '/img/Badges.png',
    imageSize: { width: 120, height: 70 },
  },
  buying: {
    icon: <DirectionsCarOutlined className='text-accent300' />,
    text: 'Compitiendo por oro',
    image: '/img/Gold.png',
    imageSize: { width: 50, height: 50 },
  },
}

export default function GoalCard() {
  const goal = useGoalStore(state => state.goal);  

  const config = modeConfig[goal?.objectiveType as keyof typeof modeConfig] || {
    icon: <Savings className='text-accent300' />,
    text: 'Objetivo desconocido',
    image: SkipUser, 
    imageSize: { width: 50, height: 50 },
  }

  return (
    <div className='flex flex-col p-4 space-y-6 shadow-lg bg-white50 rounded-2xl lg:w-[90%] lg:mx-auto'>
      {/* Header */}
		<div className='flex items-center justify-between'>
			<div className='flex items-center space-x-2'>
			<Savings className='text-accent300' />
			<h6 className='text-h6-bold text-white900'>Tus metas</h6>
			</div>
		</div>
		<p className='text-p2-regular text-white700'>
			Aquí puedes ajustar y revisar tus metas, asegúrate de que cada objetivo esté alineado con tus sueños y aspiraciones.
		</p>

      {/* Goal */}
    {goal && config.icon 
      ?<div className='space-y-6'>
			<div className='flex items-center justify-between p-4 rounded-lg shadow-sm'>
			{/* Icon and text */}
				<div className='flex items-center space-x-3'>
					<div className='flex flex-col text-start space-y-2'>
					<p className='text-p1-semibold'>{goal?.description}</p>
					<p className='text-p3-regular'>
						$ {goal?.amountObjective.toLocaleString()} meta.
						{goal?.objectiveType === 'pleasure' && (
						<Button size='small' variant='solid' className='rounded-3xl bg-accent300 border-none shadow-sm text-p3-semibold ml-2'>
							Con IUpi FCI
						</Button>
						)}
					</p>
					</div>
				</div>

				{/* Image and text */}
				<div className='flex flex-col place-items-center space-y-1'>
					<Image src={config.image} width={config.imageSize.width} height={config.imageSize.height} alt="" />
					<p className='text-p3-medium'>{config.text}</p>
				</div>
			</div>
      </div>
	  : <></>}

    {goal ?
      <div className='flex items-center justify-center w-full space-x-4'>
			<Link href={'/app/home/goals'} passHref className='w-full'>
			<Button size='medium' className='rounded-3xl w-full bg-accent25'>
				Ver más
			</Button>
			</Link>
			<Link href={'/app/home/goals'} passHref className='w-full'>
			<Button size='medium' variant='outline' className='rounded-3xl w-full bg-white100 border-none shadow-sm text-white900'>
				Nueva meta
			</Button>
			</Link>
      </div>

	  :
	  <><div className='space-y-6'>
		<div className='flex items-center justify-between p-4 rounded-lg shadow-sm'>
			<label>
			<p className='text-p1-semibold p-1'>Aún no has creado una meta ! </p>
			<p className="text-p2-regular text-accent400">Elige tu objetivo y comienza la aventura</p>
			</label>
			<div className='flex flex-col place-items-center space-y-1'>
				<Image src={config.image} width={config.imageSize.width} height={config.imageSize.height} alt="" />
			</div>
		</div>
	</div>
	   <div className='flex items-center justify-center w-full space-x-4'>
	  <Link href={'/app/home/goals'} passHref className='flex justify-center w-full'>
	  <Button size='medium' variant='solid' className='rounded-3xl w-[90%]'>
		 Crear meta
	  </Button>
	  </Link>
</div></>}
    </div>
  );
}
