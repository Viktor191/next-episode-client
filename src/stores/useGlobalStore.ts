import {create} from "zustand";

type State = {
    error: string | null;
    setError: (error: string) => void;
    clearError: () => void;
};

export const useGlobalStore = create<State>((set) => ({
    error: null,
    setError: (error) => set(() => ({error: error})),
    clearError: () => set({error: null}),
}));
