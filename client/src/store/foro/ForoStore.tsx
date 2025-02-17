import { create } from 'zustand';

export interface ForoItem {
  autor: string;
  tittle: string;
  description: string;
  text: string;
  date: string;
  comments: number;
  category: string;
}

export interface Post {
  category: string;
  tittle: string;
  text: string;
  autor:string;
  description: string;
}

export interface ForoStore {
  foroData: { [key: string]: ForoItem[] };
  initData: ForoItem[];
  setForoData: (newData: ForoItem[]) => void;
  clearForoData: () => void;
  getCategorias: () => string[];
  fetchData: () => Promise<void>;
  addPost: (post: Post) => void; 
}

const useForoStore = create<ForoStore>((set, get) => ({
  foroData: {},
  initData: [
    {
      autor: 'Juan Pérez',
      tittle: 'Inversión en bienes raíces',
      description: 'Explorando cómo invertir en propiedades',
      text: 'En este artículo exploramos las mejores estrategias...',
      date: '2025-02-17',
      comments: 10,
      category: 'Estrategia de inversión',
    },
    {
      autor: 'María López',
      tittle: 'Tecnología y el futuro',
      description: 'Impacto de la inteligencia artificial',
      text: 'La inteligencia artificial está cambiando el mundo...',
      date: '2025-02-16',
      comments: 5,
      category: 'Criptomonedas',
    },
    {
      autor: 'Esteban Quito',
      tittle: 'La vida no termina a los 30 !!',
      description: 'Como incoporar habitos de ahorro para un retiro digno y hegemonico',
      text: 'El éxito empresarial depende de una buena estrategia...',
      date: '2025-02-14',
      comments: 20,
      category: 'Jubilación',
    },
    {
      autor: 'Carlos Gómez',
      tittle: 'El arte de la estrategia empresarial',
      description: 'Cómo crear una visión estratégica para tu empresa',
      text: 'El éxito empresarial depende de una buena estrategia...',
      date: '2025-02-14',
      comments: 20,
      category: 'Estrategias de inversión',
    },
    {
      autor: 'Carlos Sanchez',
      tittle: 'No te sirve? Vendelo!',
      description: 'Cómo crear una visión estratégica para tus finanzas',
      text: 'El éxito empresarial depende de una buena estrategia...',
      date: '2025-02-14',
      comments: 20,
      category: 'Ingresos Pasivos',
    },
    {
      autor: 'Carlos Sanchez',
      tittle: 'Compra deuda!! Beneficio 100%',
      description: 'Hay que perderle el miedo a la incorporacion de deudas de terceros',
      text: 'El éxito empresarial depende de una buena estrategia...',
      date: '2025-02-14',
      comments: 20,
      category: 'Ingresos Pasivos',
    },
    {
      autor: 'Carlos Sanchez',
      tittle: 'Soy una oveja o soy un lobo?',
      description: 'Vas a seguir al rebaño o vas a ser el lobo que arraza con todo?',
      text: 'El éxito empresarial depende de una buena estrategia...',
      date: '2025-02-14',
      comments: 20,
      category: 'Tendencias del mercado',
    },
    {
      autor: 'Susana Horia',
      tittle: 'Que no te engañen!',
      description: 'Ultimamente hay rumores en cuanto al ingreso de dolares al BCRA',
      text: 'El éxito empresarial depende de una buena estrategia...',
      date: '2025-02-14',
      comments: 20,
      category: 'Psicología financiera',
    },
  ],

  addPost: (post: Post) => {
    const newPost: ForoItem = {
      ...post,
      date: new Date().toISOString(), 
      comments: 0, 
    };

    set((state) => {
      const { category } = newPost;
      return {
        foroData: {
          ...state.foroData,
          [category]: [...(state.foroData[category] || []), newPost],
        },
      };
    });
  },

  setForoData: (newData: ForoItem[]) => {
    set((state) => {
      const updatedData = { ...state.foroData };

      newData.forEach((item) => {
        if (!updatedData[item.category]) {
          updatedData[item.category] = [];
        }
        updatedData[item.category].push(item);
      });

      return { foroData: updatedData };
    });
  },

  clearForoData: () => set({ foroData: {} }),

  getCategorias: () => {
    return get().foroData ? Object.keys(get().foroData) : [];
  },

  fetchData: async () => {
    const currentData = get().foroData;
    if (Object.keys(currentData).length === 0) {
      const data: ForoItem[] = get().initData;
  
      set((state) => {
        const updatedData = { ...state.foroData };
  
        data.forEach((item) => {
          if (!updatedData[item.category]) {
            updatedData[item.category] = [];
          }
          updatedData[item.category].push(item);
        });
  
        return { foroData: updatedData };
      });
    }
  }
}));

export default useForoStore;
