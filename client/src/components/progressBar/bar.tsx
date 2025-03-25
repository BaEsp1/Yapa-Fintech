import { ArrowLeftBar } from '@/assets';
import React from 'react';
import Image from 'next/image';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onPrevious?: () => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, onNext, onPrevious }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-[97%] flex gap-4 justify-center items-center">
        { currentStep > 1 
        ? 
        <button onClick={onPrevious} type="button" className="flex gap-1 items-center text-white400 text-p2-regular ml-3">
        <Image src={ArrowLeftBar} alt="<" />
            Atrás
        </button>
        :
        <button type="button" className="flex gap-1 items-center text-white400 text-p2-regular ml-3">
        <Image src={ArrowLeftBar} alt="<" />
        Atrás
      </button>
        }

        <div className="w-[12.5em] bg-primary300 h-[4px] dark:bg-gray-300">
            <div
                className="bg-accent400 h-[4px]"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
        {
          currentStep === totalSteps 
          ? 
          <button type="button" className="flex items-center text-white400 text-p2-regular">
          Siguiente
          </button>  
          :
          <button onClick={onNext} type="button" className="flex items-center text-accent400 text-p2-regular">
          Siguiente
          </button>
        }

    </div>
  );
};

export default ProgressBar;
