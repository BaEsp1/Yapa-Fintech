'use client';
import React, { useState } from 'react';
import Button from '../ui/Button';
import { Savings } from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { Goal, useGoalStore } from '@/store/goal/goalStore';
import { SkipUser } from '@/assets';
import { DetailGoal } from '../modal/goals/detailGoals';

export default function GoalCard() {
  const goals = useGoalStore((state) => state.goal) ?? [];
  const [detail, setDetail] = useState<Goal | null>(null);
  const [openModal, setOpenModal] = useState(false);
  let icon;

  const getIconForGoal = (objectiveType: string) => {
    switch (objectiveType) {
      case 'Comprar un vehículo':
        return '🚓';
      case 'Vacaciones':
        return '🏖️​';
      case 'Retiro':
        return '👔';
      case 'Inversión':
      case 'Fondo de emergencia':
        return '💰';
      case 'Compra de equipos':
      case 'Hobbie':
        return '🎮';
      case 'Comprar una casa':
        return '🏠';
      case 'Educación':
        return '📕';
      case 'Celebración':
        return '🎉';
      case 'Proyecto personal':
      case 'Otro':
        return '📝';
      case 'Viajar':
        return '🧳​';
      default:
        return '💸​';
    }
  };

  const handleDetail = (goal: Goal) => {
    setDetail(goal);
    setOpenModal(true); // Abre el modal
  };

  const handleSetDetail = () => {
    setDetail(null); // Limpia los detalles
    setOpenModal(false); // Cierra el modal
  };

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

      {/* Metas */}
      {goals.length > 0 ? (
        <div className='space-y-6'>
          {goals.map((goal: Goal, index: number) => {
            icon = getIconForGoal(goal.objectiveType);
            return (
              <div
                key={index}
                className='flex items-center justify-between p-4 rounded-lg shadow-sm'
                onClick={() => handleDetail(goal)}
              >
                <div className='flex items-center space-x-3'>
                  <div className='flex flex-col text-start space-y-2'>
                    <p className='text-p1-semibold'>{goal.description}</p>
                    <p className='text-p3-regular'>
                      Meta: $ {goal.amountObjective?.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Icon and progress */}
                <div className='flex flex-col place-items-center space-y-1'>
                  <h1 className='text-h2-regular'>{icon}</h1>
                  <p className='text-p3-medium'>Progreso {goal.progress}%</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className='space-y-6'>
          <div className='flex items-center justify-between p-4 rounded-lg shadow-sm'>
            <label>
              <p className='text-p1-semibold p-1'>Aún no has creado una meta!</p>
              <p className='text-p2-regular text-accent400'>Elige tu objetivo y comienza la aventura</p>
            </label>
            <div className='flex flex-col place-items-center space-y-1'>
              <Image src={SkipUser} width={50} height={50} alt='' />
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {openModal && (
        <DetailGoal detail={detail} icon={icon || ""} onClose={handleSetDetail} />
      )}

      <div className='flex items-center justify-center w-full space-x-4'>
        <Link href={'/app/home/goals'} passHref className='flex w-full justify-end items-end'>
          <Button size='medium' variant='solid' className='rounded-3xl w-[40%] border-none shadow-sm text-white'>
            Nueva meta
          </Button>
        </Link>
      </div>
    </div>
  );
}
