// walletStore.ts
import { create } from 'zustand';
import { fetchWalletData } from '@/utils/balance/FetchBalance';

interface TotalBalance {
  deposited: number;
  invested: number;
  saved: number;
  total: number
}
interface WalletState {
  totalBalance: TotalBalance;
  loadBalanceData: () => Promise<void>;
}

const useWalletStore = create<WalletState>((set) => ({
  totalBalance: { deposited: 0, invested: 0, saved: 0 , total: 0},

  loadBalanceData: async () => {
    try {
      const response = await fetchWalletData(); 
      console.log("recibo respuesta",response)

      set({
        totalBalance: {
          deposited: response.deposited,
          invested: response.invested,
          saved: response.saved,
          total: response.totalBalance
        },
      });
    } catch (error) {
      console.error('Error loading balance data in store:', error);
    }
  },

  addToDeposited: async (amount: number) => {

      set((state) => ({
        totalBalance: {
          ...state.totalBalance,
          deposited: state.totalBalance.deposited + amount,
        },
      }));
  
}
}));

export default useWalletStore;
