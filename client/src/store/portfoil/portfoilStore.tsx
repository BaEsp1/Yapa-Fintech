import {create} from 'zustand';
import { getPortfolios } from '@/utils/portfoil/getPortfoil'; 


export interface Portfolio {
  id: number;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
  category: string;
  object: [string, string, number, number]; // [name, detail, price, quantity]
  userId: number;
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

      const categorizedPortfolios = data.portfolios.reduce(

        (acc: Record<string, Portfolio[]>, portfolio: Portfolio) => {
          const { category } = portfolio; 

          if (!acc[category]) {
            acc[category] = [];
          }

          acc[category].push({
            id: portfolio.id,
            quantity: portfolio.quantity,
            purchasePrice: portfolio.purchasePrice,
            purchaseDate: portfolio.purchaseDate,
            userId: portfolio.userId,
            object: portfolio.object, 
            category: portfolio.category,
          });

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
