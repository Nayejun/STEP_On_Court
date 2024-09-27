"use client";

import { IRegister } from "@/app/types/types";
import React, { useState } from "react";
import useStore from "../utils/store";

function Register() {
   const [registerData, setRegisterData] = useState<IRegister>({
      username: "",
      email: "",
      password: "",
   });

   const register = useStore((state) => state.register);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setRegisterData({
         ...registerData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await register(registerData);
   };

   return (
      <div>
         <h1>Register</h1>
         <form onSubmit={handleSubmit}>
            <input
               type="text"
               name="username"
               placeholder="Username"
               value={registerData.username}
               onChange={handleChange}
            />
            <input
               type="email"
               name="email"
               placeholder="Email"
               value={registerData.email}
               onChange={handleChange}
            />
            <input
               type="password"
               name="password"
               placeholder="Password"
               value={registerData.password}
               onChange={handleChange}
            />
            <button type="submit">Register</button>
         </form>
      </div>
   );
}

export default Register;
