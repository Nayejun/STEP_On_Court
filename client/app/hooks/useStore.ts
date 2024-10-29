import { create } from "zustand";

interface StoreState {
   data: Record<string, any>;
   setData: (key: string, value: any) => void;
   getData: (key: string) => any;
}

export const useStore = create<StoreState>((set, get) => ({
   data: {},
   setData: (key, value) =>
      set((state) => ({ data: { ...state.data, [key]: value } })),
   getData: (key) => get().data[key], // get() 함수로 현재 상태에서 값을 가져옴
}));
