"use client";

import { IAuthFormProps, ILogin, IRegister } from "@/app/types/types";
import React, { useState } from "react";
import { validateLogin, validateSignup } from "@/app/utils/validations";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import Stack from "@/app/components/ui/stack";
import useStore from "@/app/utils/store";

const AuthForm: React.FC<IAuthFormProps> = ({ authType }) => {
   const [formData, setFormData] = useState<IRegister | ILogin>(
      authType === "register"
         ? { username: "", email: "", password: "" }
         : { email: "", password: "" }
   );

   const register = useStore((state) => state.register);
   const login = useStore((state) => state.login);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (authType === "register") {
         validateSignup(formData as IRegister) &&
            (await register(formData as IRegister));
      } else {
         validateLogin(formData as ILogin) && (await login(formData as ILogin));
      }
   };
   return (
      <Stack justify="center" align="center" bgColor="pink">
         <Stack
            justify="center"
            align="center"
            flexDirection="column"
            bgColor="skyblue"
         >
            <h1>{authType === "register" ? "Register" : "Login"}</h1>
            <form onSubmit={handleSubmit}>
               {authType === "register" && (
                  <Input
                     type="text"
                     name="username"
                     placeholder="Username"
                     value={(formData as IRegister).username}
                     onChange={handleChange}
                  />
               )}
               <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
               />
               <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
               />
               <Stack justify="center" align="center">
                  <Button type="submit">
                     {authType === "register" ? "Register" : "Login"}
                  </Button>
               </Stack>
            </form>
         </Stack>
      </Stack>
   );
};

export default AuthForm;
