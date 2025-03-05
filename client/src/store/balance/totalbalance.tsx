// walletStore.ts
import { create } from 'zustand';
import { fetchWalletData } from '@/utils/balance/FetchBalance';

interface TotalBalance {
  deposited: number;
  invested: number;
  saved: number;
}

interface WalletState {
  totalBalance: TotalBalance;
  loadBalanceData: () => Promise<void>;
}

const useWalletStore = create<WalletState>((set) => ({
  totalBalance: { deposited: 0, invested: 0, saved: 0 },

  loadBalanceData: async () => {
    try {
      const walletData = await fetchWalletData(); 

      set({
        totalBalance: {
          deposited: walletData.deposited,
          invested: walletData.invested,
          saved: walletData.saved,
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
