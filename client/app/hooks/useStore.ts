import { create } from "zustand";

interface StoreState {
   data: Record<string, any>;
   setData: (key: string, value: any) => void;
   getData: (key: string) => any;
}

export const useStore = create<StoreState>((set) => ({
   data: {},
   setData: (key, value) =>
      set((state) => ({ data: { ...state.data, [key]: value } })),
   getData: (key) => (state: { data: { [x: string]: any } }) => state.data[key],
}));
