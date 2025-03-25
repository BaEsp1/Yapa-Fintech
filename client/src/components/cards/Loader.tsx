import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';

export default function Loader() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 20);
    return () => clearTimeout(timer);
  }, []);

  return (
    loading && (
      <div className='flex flex-col items-center justify-center'>
        <div className='w-12 h-12 relative'>
          <div className='z-10 absolute inset-0 border-t-4 border-primaryDefault rounded-full animate-spin'></div>
          <div className='absolute inset-0 border-4 border-gray200 rounded-full'></div>
        </div>
        <p className='mt-3 text-lg font-semibold text-white'>Cargando...</p>
      </div>
    )
  );
}