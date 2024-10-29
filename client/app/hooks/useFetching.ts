import {
   QueryClient,
   QueryKey,
   useMutation,
   useQuery,
} from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

import { useStore } from "./useStore";

interface UseFetchingOptions {
   method?: "GET" | "POST" | "PUT" | "DELETE";
   url: string;
   payload?: any;
   headers?: Record<string, string>;
   queryKey?: QueryKey;
   onSuccess?: (data: any) => void;
   onError?: (error: any) => void;
}

const queryClient = new QueryClient();

export const useFetching = ({
   method = "GET",
   url,
   payload,
   headers,
   queryKey,
   onSuccess,
   onError,
}: UseFetchingOptions) => {
   const { setData } = useStore();

   const fetchData = async () => {
      const config: AxiosRequestConfig = {
         method,
         url,
         headers,
         data: payload,
      };
      try {
         const response = await axios(config);
         const data = response.data;
         setData(url, data);
         onSuccess?.(data);
         return data;
      } catch (error: any) {
         onError?.(error);
         throw error;
      }
   };

   const queryFn = () =>
      useQuery({
         queryKey: queryKey || [url],
         queryFn: fetchData,
      });

   const mutationFn = () =>
      useMutation({
         mutationFn: fetchData,
      });

   return method === "GET" ? queryFn() : mutationFn();
};
