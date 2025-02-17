import { create } from 'zustand';

interface RecommendationItem {
  label: string;
  description: string;
  percentage: number;
}

interface Recommendation {
  instrument: string;
  items: RecommendationItem[];
}

interface RecommendationsStore {
  recommendations: Recommendation[];
  setRecommendations: (profile: string) => void; 
  clearRecommendations: () => void;
}

export const useRecommendationsStore = create<RecommendationsStore>((set) => ({
  recommendations: [],
  setRecommendations: (profile: string) => {

    let recommendations: Recommendation[] = [];

    if (profile === 'Sembrador de Oportunidades') {
      recommendations = [
        {
          instrument: 'Cuentas de ahorro',
          items: [
            {
              label: 'Cuentas de ahorro a plazo',
              description: 'Instrumento de bajo riesgo con rentabilidad garantizada',
              percentage: 40,
            },
            {
              label: 'Cuentas de ahorro líquidas',
              description: 'Ahorro con acceso inmediato y rendimiento moderado',
              percentage: 60,
            },
          ],
        },
      ];
    } else if (profile === 'Explorador de nuevos caminos') {
      recommendations = [
        {
          instrument: 'Fondos de inversión',
          items: [
            {
              label: 'Fondos mixtos',
              description: 'Instrumento de riesgo moderado que invierte en una mezcla de acciones y bonos',
              percentage: 50,
            },
            {
              label: 'Bonos corporativos',
              description: 'Instrumento de riesgo moderado con pagos de intereses regulares',
              percentage: 50,
            },
          ],
        },
      ];
    } else if (profile === 'Cazador de inversiones') {
      recommendations = [
        {
          instrument: 'Acciones',
          items: [
            {
              label: 'Acciones tecnológicas',
              description: 'Alta rentabilidad con mayor riesgo, adecuado para inversores de largo plazo',
              percentage: 70,
            },
            {
              label: 'Acciones de energía renovable',
              description: 'Inversión en un sector emergente con alto potencial de crecimiento',
              percentage: 30,
            },
          ],
        },
      ];
    }

    set({ recommendations });
  },
  clearRecommendations: () => set({ recommendations: [] }),
}));
