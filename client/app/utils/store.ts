import { create } from "zustand";
import { IFixReservation, IRegister } from "../types/types";

const client = async (url: string, options: RequestInit = {}) => {
   const response = await fetch(url, options);
   return response.json();
};

let accessToken = "";

const useStore = create((set: any) => ({
   activities: [],
   reservations: [],
   myReservationsList: [],
   reservationsByDateList: [],
   user: null,

   register: async (registerData: IRegister) => {
      await client("/api/auth/register", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(registerData),
      });
   },

   login: async (loginData: { email: string; password: string }) => {
      const res = await client("/api/auth/login", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(loginData),
      });
      accessToken = res.accessToken;
      set({ user: res });
   },

   generateActivities: async () => {
      const res = await client("/api/activities/generate", {
         method: "POST",
      });
      set({ activities: res });
   },

   createReservations: async () => {
      const res = await client("/api/reservations/create", {
         method: "POST",
         headers: {
            Authorization: `Bearer ${accessToken}`,
         },
      });
      set({ reservations: res });
   },

   myReservations: async () => {
      const res = await client("/api/reservations/my");
      set({ myReservationsList: res });
   },

   reservationByDate: async (date: string) => {
      const res = await client(`/api/reservations/date/${date}`);
      set({ reservationsByDateList: res });
   },

   cancelReservations: async (id: number) => {
      const res = await client(`/api/reservations/cancel/${id}`, {
         method: "DELETE",
      });
      set({ reservations: res });
   },

   allReservations: async () => {
      const res = await client("/api/reservations/all");
      set({ reservations: res });
   },

   adminCancelReservation: async (id: number) => {
      const res = await client(`/api/reservations/admin/cancel/${id}`, {
         method: "DELETE",
      });
      set({ reservations: res });
   },

   fixReservations: async (
      fixReservationsData: IFixReservation,
      id: number
   ) => {
      const res = await client(`/api/reservations/update/${id}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
         },
         body: JSON.stringify(fixReservationsData),
      });
      set({ reservations: res });
   },
}));

export default useStore;
