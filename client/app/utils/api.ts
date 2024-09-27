import { RegisterData } from "../types/types";

export const fetchRegister = async (data: RegisterData) => {
   const response = await fetch("/auth/register", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return response.json();
};

export const fetchLogin = async (data: { email: string; password: string }) => {
   const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return response.json();
};

export const fetchActivitiesGenerate = async () => {
   const response = await fetch("/activities/generate", {
      method: "POST",
   });
   return response.json();
};

export const fetchActivities = async () => {
   const response = await fetch("/activities");
   return response.json();
};

export const fetchMyReservations = async () => {
   const response = await fetch("/reservations/my");
   return response.json();
};

export const fetchReservationsByDate = async (date: string) => {
   const response = await fetch(`/reservations/date/${date}`);
   return response.json();
};
