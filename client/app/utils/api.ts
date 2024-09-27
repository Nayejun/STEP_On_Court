import { TLoginData, TRegisterData } from "../types/types";

const fetchData = async (url: string, options: RequestInit = {}) => {
   const response = await fetch(url, options);
   return response.json();
};

export const fetchRegister = (data: TRegisterData) => {
   return fetchData("/auth/register", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
};

export const fetchLogin = (data: TLoginData) => {
   return fetchData("/auth/login", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
};

export const fetchActivitiesGenerate = () => {
   return fetchData("/activities/generate", {
      method: "POST",
   });
};

export const fetchActivities = () => {
   return fetchData("/activities");
};

export const fetchMyReservations = () => {
   return fetchData("/reservations/my");
};

export const fetchReservationsByDate = (date: string) => {
   return fetchData(`/reservations/date/${date}`);
};
