import { create } from "zustand";
import { IFixReservation, ILogin, IRegister } from "../types/types";

interface StoreState {
   activities: any[];
   reservations: any[];
   myReservationsList: any[];
   reservationsByDateList: any[];
   user: any | null;
   register: (registerData: IRegister) => Promise<void>;
   login: (loginData: { email: string; password: string }) => Promise<void>;
   generateActivities: () => Promise<void>;
   createReservations: () => Promise<void>;
   myReservations: () => Promise<void>;
   reservationByDate: (date: string) => Promise<void>;
   cancelReservations: (id: number) => Promise<void>;
   allReservations: () => Promise<void>;
   adminCancelReservation: (id: number) => Promise<void>;
   fixReservations: (
      fixReservationsData: IFixReservation,
      id: number
   ) => Promise<void>;
}

let accessToken = "";

const useStore = create<StoreState>((set) => ({
   activities: [],
   reservations: [],
   myReservationsList: [],
   reservationsByDateList: [],
   user: null,

   register: async (registerData: IRegister) => {
      const response = await fetch("/api/auth/register", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(registerData),
      });
      const data = await response.json();
      set({ user: data });
   },

   login: async (loginData: ILogin) => {
      const response = await fetch("/api/auth/login", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(loginData),
      });
      const data = await response.json();
      accessToken = data.accessToken;
      set({ user: data });
   },

   generateActivities: async () => {
      const response = await fetch("/api/activities/generate", {
         method: "POST",
      });
      const data = await response.json();
      set({ activities: data });
   },

   createReservations: async () => {
      const response = await fetch("/api/reservations/create", {
         method: "POST",
         headers: {
            Authorization: `Bearer ${accessToken}`,
         },
      });
      const data = await response.json();
      set({ reservations: data });
   },

   myReservations: async () => {
      const response = await fetch("/api/reservations/my", {
         headers: {
            Authorization: `Bearer ${accessToken}`,
         },
      });
      const data = await response.json();
      set({ myReservationsList: data });
   },

   reservationByDate: async (date: string) => {
      const response = await fetch(`/api/reservations/date/${date}`, {
         headers: {
            Authorization: `Bearer ${accessToken}`,
         },
      });
      const data = await response.json();
      set({ reservationsByDateList: data });
   },

   cancelReservations: async (id: number) => {
      const response = await fetch(`/api/reservations/cancel/${id}`, {
         method: "DELETE",
         headers: {
            Authorization: `Bearer ${accessToken}`,
         },
      });
      const data = await response.json();
      set({ reservations: data });
   },

   allReservations: async () => {
      const response = await fetch("/api/reservations/all", {
         headers: {
            Authorization: `Bearer ${accessToken}`,
         },
      });
      const data = await response.json();
      set({ reservations: data });
   },

   adminCancelReservation: async (id: number) => {
      const response = await fetch(`/api/reservations/admin/cancel/${id}`, {
         method: "DELETE",
         headers: {
            Authorization: `Bearer ${accessToken}`,
         },
      });
      const data = await response.json();
      set({ reservations: data });
   },

   fixReservations: async (
      fixReservationsData: IFixReservation,
      id: number
   ) => {
      const response = await fetch(`/api/reservations/fix/${id}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
         },
         body: JSON.stringify(fixReservationsData),
      });
      const data = await response.json();
      set({ reservations: data });
   },
}));

export default useStore;
