"use client";

import React, { useState } from "react";
import useStore from "../utils/store";
import { ILogin } from "../types/types";
import { validateLogin } from "../utils/validations";

function Login() {
   const [loginData, setLoginData] = useState<ILogin>({
      email: "",
      password: "",
   });
   const [errors, setErrors] = useState<any[]>([]);

   const login = useStore((state) => state.login);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginData({
         ...loginData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const validationResult = validateLogin(loginData);

      if (validationResult.success) {
         setErrors([]);
         await login(loginData);
      } else {
         setErrors(validationResult.errors || []);
      }
   };

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <input
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
