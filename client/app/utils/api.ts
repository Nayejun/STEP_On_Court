import { RegisterData } from "../types/types";

export const fetchRegister = async (data: RegisterData) => {
   const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return response.json();
};

export const fetchLogin = async (data: { email: string; password: string }) => {
   const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return response.json();
};

export const fetchActivitiesGenerate = async () => {
   const response = await fetch("/api/activities/generate", {
      method: "POST",
   });
   return response.json();
};

export const fetchActivities = async () => {
   const response = await fetch("/api/activities");
   return response.json();
};
