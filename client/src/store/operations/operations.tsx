import {create} from 'zustand';
import axios from 'axios';
const URL = process.env.NEXT_PUBLIC_API_URL

export interface Operation {
  symbol: string;
  date: string;
  price: number;
  type: 'compra' | 'venta'; 
}

interface OperationsStore {
  operations: Operation[];
  loadOperations: () => void;
}

const useOperationsStore = create<OperationsStore>((set) => ({
  operations: [] ,
  loadOperations: async () => {
    try {
      const response = await axios.get(`${URL}/api/operations`);
      const data = response.data; 
      console.log(data)
      set({ operations: data }); 
    } catch (error) {
      console.error('Error al cargar operaciones:', error);
    }
  },
}));

export default useOperationsStore;
