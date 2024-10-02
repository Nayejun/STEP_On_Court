"use client";

import React, { useEffect, useState } from "react";
import { IRegister } from "@/app/types/types";
import useStore from "@/app/utils/store";
import { validateSignup } from "@/app/utils/validations";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import Stack from "@/app/components/ui/stack";

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
      validateSignup(registerData) ? await register(registerData) : null;
   };

   return (
      <Stack justify="center" align="center" bgColor="pink">
         <Stack
            justify="center"
            align="center"
            flexDirection="column"
            bgColor="skyblue"
         >
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
               <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={registerData.username}
                  onChange={handleChange}
               />
               <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={registerData.email}
                  onChange={handleChange}
               />
               <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={registerData.password}
                  onChange={handleChange}
               />
               <Stack justify="center" align="center">
                  <Button type="submit">Register</Button>
               </Stack>
            </form>
         </Stack>
      </Stack>
   );
}

export default Register;
