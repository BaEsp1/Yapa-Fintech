import {create} from 'zustand';
import axios from 'axios';

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
  operations: [
    {  
    symbol: "ABL30.BA",
    date: "2025-01-29",
    price: 150,
    type: 'compra' },
    {  
    symbol: "ABL30.BA",
    date: "2025-01-28",
    price: 200,
    type:  'venta' }
],
  loadOperations: async () => {
    try {
      const response = await axios.get('URL_DEL_BACKEND'); // Reemplaza por tu URL
      const data = response.data; // Asumiendo que la respuesta es un array de operaciones
      set({ operations: data }); // Almacenamos todas las operaciones en el estado
    } catch (error) {
      console.error('Error al cargar operaciones:', error);
    }
  },
}));

export default useOperationsStore;
