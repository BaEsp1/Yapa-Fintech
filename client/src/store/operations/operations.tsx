import {create} from 'zustand';
import { fetchOperations , fetchSellOperation , fetchBuyOperation } from '@/utils/operations/fetchsOperations';

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
  purchasePrice?:number
}

interface OperationsStore {
  operations: Operation[];
  loadOperations: () => void;
  sellOperation: (operationData: { instrument: Instrument, operationType: string, currency: string, subTotal: number , totalPrice : number}) => void;
  buyOperation: (operationData: { instrument: Instrument, operationType: string, currency: string, subTotal: number , totalPrice : number}) => void;
}

const useOperationsStore = create<OperationsStore>((set) => ({
  operations: [] ,
  loadOperations: async () => {
    const data = await fetchOperations(); 
    if (data) {
      set({ operations: data });
  }},
  sellOperation: async (operationData) => {
    const response = await fetchSellOperation(operationData);
    if (response) {
      set((state) => ({ operations: [...state.operations, response.operation] }));
    }
  },
  buyOperation: async (operationData) => {
    const response = await fetchBuyOperation(operationData);
    if (response) {
      set((state) => ({ operations: [...state.operations, response.operation] }));
    }
  },
}));

export default useOperationsStore;
