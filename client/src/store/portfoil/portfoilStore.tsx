import { create } from 'zustand';
import { getPortfolios } from '@/utils/portfoil/getPortfoil'; 
import { Instrument } from '../operations/operations';

export interface Portfolio {
  id: number;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
  currency:string;
  type: string;
  object: [string, string, number, number]; // [name, detail, price, quantity]
}

interface PortfoilStore {
  portfolios: Record<string, Portfolio[]>;  
  loading: boolean;
  error: string | null;
  fetchPortfolios: () => void;
}

const usePortfoilStore = create<PortfoilStore>((set) => ({
  portfolios: {},  
  loading: false,
  error: null,

  fetchPortfolios: async () => {
    set({ loading: true, error: null });

    try {
      const data = await getPortfolios();  

      const categorizedPortfolios = data.instruments.reduce(
        (acc: Record<string, Portfolio[]>, instrument: Instrument) => {
          const { type, quantity, price, name, symbol, idPortfoil ,currency} = instrument;

          const portfolioData: Portfolio = {
            id: idPortfoil || 0,  
            quantity,
            currency,
            purchasePrice: price,
            purchaseDate: new Date().toISOString(),
            object: [symbol,name, price, quantity],  
            type,
          };

          if (!acc[type]) {
            acc[type] = [];  
          }

          acc[type].push(portfolioData);

          return acc;
        },
        {} as Record<string, Portfolio[]>  
      );

      set({ portfolios: categorizedPortfolios });
    } catch (error: unknown) { 
      set({ error: error instanceof Error ? error.message : 'Error desconocido' });
    } finally {
      set({ loading: false });
    }
  }
}));

export default usePortfoilStore;
