import { create } from 'zustand';

interface RecommendationItem {
  label: string;
  description: string;
  percentage: number;
  symbol:string;
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
          instrument: 'Bonos',
          items: [
            {
              label: 'Bono AL30',
              description: 'Rentabilidad moderada, baja volatilidad.',
              percentage: 40,
              symbol: 'AL30.BA',
            },
            {
              label: 'Bono AL35',
              description: 'Rentabilidad estable y crecimiento moderado.',
              percentage: 30,
              symbol: 'AL35.BA',
            },
            {
              label: 'Bono PR13',
              description: 'Bonos provinciales con buen rendimiento.',
              percentage: 30,
              symbol: 'PR13.BA',
            }
          ],
        },
      ];
    } else if (profile === 'Explorador de nuevos caminos') {
      recommendations = [
        
        {
          instrument: 'Bonos',
          items: [
            {
              label: 'Bono GD30',
              description: 'Bonos de mediana duración, con buen rendimiento.',
              percentage: 30,
              symbol: 'GD30.BA',
            },
            {
              label: 'Bono GD35',
              description: 'Bonos con mayor rentabilidad a largo plazo.',
              percentage: 30,
              symbol: 'GD35.BA',
            },
            {
              label: 'Bono TX24',
              description: 'Bono del Tesoro Nacional con rendimiento ajustado por CER.',
              percentage: 40,
              symbol: 'TX24.BA',
            },
          ],
        },
      ];
    } else if (profile === 'Cazador de inversiones') {
      recommendations = [
        {
          instrument: 'Cedears',
          items: [
            {
              label: 'Apple Inc.',
              description: 'Alta rentabilidad y crecimiento constante.',
              percentage: 20,
              symbol: 'AAPL.BA',
            },
            {
              label: 'Tesla Inc.',
              description: 'Innovación y crecimiento en el sector automotriz.',
              percentage: 20,
              symbol: 'TSLA.BA',
            },
            {
              label: 'Microsoft Corp.',
              description: 'Rentabilidad estable, líder en tecnología.',
              percentage: 20,
              symbol: 'MSFT.BA',
            },
            {
              label: 'Meta Platforms Inc.',
              description: 'Potencial de crecimiento en redes sociales.',
              percentage: 10,
              symbol: 'META.BA',
            },
            {
              label: 'NVIDIA Corp.',
              description: 'Crecimiento en el sector de inteligencia artificial.',
              percentage: 15,
              symbol: 'NVDA.BA',
            },
            {
              label: 'Amazon Inc.',
              description: 'Crecimiento en e-commerce y tecnología.',
              percentage: 15,
              symbol: 'AMZEN.BA',
            },
          ],
        },
      ];
    }

    set({ recommendations });
  },
  clearRecommendations: () => set({ recommendations: [] }),
}));
