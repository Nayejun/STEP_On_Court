"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { validateLogin } from "@/utils/validations";
import { ILogin } from "@/types/types";
import useStore from "@/utils/store";

function Login() {
   const [loginData, setLoginData] = useState<ILogin>({
      email: "",
      password: "",
   });

   const login = useStore((state) => state.login);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginData({
         ...loginData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      validateLogin(loginData) ? await login(loginData) : null;
   };

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <Input
               type="email"
               name="email"
               value={loginData.email}
               onChange={handleChange}
               placeholder="Email"
            />

            <input
               type="password"
               name="password"
               value={loginData.password}
               onChange={handleChange}
               placeholder="Password"
            />
            <button type="submit">Login</button>
         </form>
      </div>
   );
}

export default Login;
