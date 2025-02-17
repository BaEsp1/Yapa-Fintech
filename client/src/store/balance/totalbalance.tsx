import { create } from 'zustand';
import axios from 'axios';

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
      const response = await axios.get('https://api.ejemplo.com/wallet');
      const walletData = response.data;

      set({
        totalBalance: {
          deposited: walletData.deposited,
          invested: walletData.invested,
          saved: walletData.saved,
        }
      });
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    }
  }
}));

export default useWalletStore;
