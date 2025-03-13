import {create} from 'zustand';
import { fetchOperations , fetchCreateOperation } from '@/utils/operations/fetchsOperations';

export interface Operation {
  idOperation:number;
  symbol: string;
  date: string;
  price: number;
  currency?:string;
  type:  'buy' | 'sell';
  instrument: Instrument;
  createdAt : Date;
  subTotal?:number;
  totalPrice:number;
}
export interface Instrument {
  name : string;
  symbol: string;
  type: string;
  price: number;
  currency: string;
  quantity: number;
  idPortfoil?:number;
}

interface OperationsStore {
  operations: Operation[];
  loadOperations: () => void;
  createOperation: (operationData: { instrument: Instrument, operationType: string, currency: string, subTotal: number , totalPrice : number}) => void;
}

const useOperationsStore = create<OperationsStore>((set) => ({
  operations: [] ,
  loadOperations: async () => {
    const data = await fetchOperations(); 
    if (data) {
      set({ operations: data });
  }},
  createOperation: async (operationData) => {
    const response = await fetchCreateOperation(operationData);
    if (response) {
      set((state) => ({ operations: [...state.operations, response.operation] }));
    }
  },
}));

export default useOperationsStore;
