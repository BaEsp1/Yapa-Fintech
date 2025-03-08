import { create } from "zustand";
import { fetchVariableData } from "@/utils/marketData/fetchDataBCRA";

interface BCRAResponse {
  idVariable: number;
  fecha: string;
  valor: number;
}
interface BCRAData {
  idVariable: number;
  fecha: string;
  valor: number;
}

interface MarketData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjclose: number;
}

interface MetaData {
  symbol: string;
  currency: string;
  exchangeName: string;
  fullExchangeName: string;
  longName: string;
}

export interface FinancialData {
  meta: MetaData;
  body: MarketData[];
}

export interface MarketState {
  tasaDeInteres: BCRAData[];
  cotizacionUSD:BCRAData[];
  bonos: FinancialData[];
  cedears: FinancialData[];
  loadAllVariablesData: () => void;
  loadBondsData: (data: FinancialData[]) => void;
  loadCedearsData: (data: FinancialData[]) => void;
}

const marketStore = create<MarketState>((set) => ({
  tasaDeInteres: [],
  cotizacionUSD:[],
  bonos: [],
  cedears: [],

  loadAllVariablesData: async () => {
    try {
      const [tasaDeInteres] = await Promise.all([
        fetchVariableData("tasaDeInteres"),
      ]);
      const [cotizacionUSD] = await Promise.all([
        fetchVariableData("cotizacionUSD"),
      ]);

      const transformBCRAData = (bcraData: BCRAResponse[]): BCRAData[] => {
        return bcraData.map(item => ({
          idVariable: item.idVariable,  
          fecha: item.fecha,
          valor: item.valor
        }));
      };

      set({
        tasaDeInteres: transformBCRAData(tasaDeInteres),
        cotizacionUSD: transformBCRAData(cotizacionUSD),
      });

      try {
        const response = await fetch("/data/bonds.json");
        if (response.ok) {
          const backupData = await response.json();
          set({ bonos: backupData });
        } else {
          console.error("Failed to load backup bonos data.");
        }
      } catch (error) {
        console.error("Error loading backup bonos data from local file", error);
      }

      try {
        const response = await fetch("/data/cedears.json");
        if (response.ok) {
          const backupData = await response.json();
          set({ cedears: backupData });
        } else {
          console.error("Failed to load backup cedears data.");
        }
      } catch (error) {
        console.error("Error loading backup cedears data from local file", error);
      }

    } catch (error) {
      console.error("Error loading market variable data", error);
    }
  },

  loadBondsData: (data: FinancialData[]) => {
    set({ bonos: data });
  },

  loadCedearsData: (data: FinancialData[]) => {
    set({ cedears: data });
  },
}));

export default marketStore;
