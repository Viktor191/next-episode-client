import { create } from 'zustand';

type ToasterData = {
  title: string;
  type: 'error' | 'success' | 'info' | 'warning';
  description: string;
};

type State = {
  error: string | null;
  setError: (error: string) => void;
  clearError: () => void;

  toasterData: ToasterData | null;
  setToasterData: (toasterData: ToasterData) => void;
  clearToaster: () => void;
};

export const useGlobalStore = create<State>((set) => ({
  error: null,
  setError: (error) => set(() => ({ error: error })),
  clearError: () => set({ error: null }),

  toasterData: null,
  setToasterData: (toasterData) => set(() => ({ toasterData })),
  clearToaster: () => set({ toasterData: null }),
}));
