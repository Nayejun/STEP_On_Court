"use client";

import { IRegister } from "@/app/types/types";
import React, { useState } from "react";
import useStore from "../utils/store";
import { validateSignup } from "../utils/validations";

function Register() {
   const [registerData, setRegisterData] = useState<IRegister>({
      username: "",
      email: "",
      password: "",
   });

   const [errors, setErrors] = useState<any[]>([]);
   const register = useStore((state) => state.register);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setRegisterData({
         ...registerData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const validationResult = validateSignup(registerData);

      if (validationResult.success) {
         setErrors([]);
         await register(registerData);
      } else {
         setErrors(validationResult.errors || []);
      }
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
            {errors.find((error) => error.path?.includes("username")) && (
               <p>
                  {
                     errors.find((error) => error.path?.includes("username"))
                        ?.message
                  }
               </p>
            )}

            <input
               type="email"
               name="email"
               placeholder="Email"
               value={registerData.email}
               onChange={handleChange}
            />
            {errors.find((error) => error.path?.includes("email")) && (
               <p>
                  {
                     errors.find((error) => error.path?.includes("email"))
                        ?.message
                  }
               </p>
            )}

            <input
               type="password"
               name="password"
               placeholder="Password"
               value={registerData.password}
               onChange={handleChange}
            />
            {errors.find((error) => error.path?.includes("password")) && (
               <p>
                  {
                     errors.find((error) => error.path?.includes("password"))
                        ?.message
                  }
               </p>
            )}

            <button type="submit">Register</button>
         </form>
      </div>
   );
}

export default Register;
