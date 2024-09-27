import { RegisterData } from "@/app/types/types";
import { fetchRegister } from "@/app/utils/api";
import React, { useState } from "react";

function Register() {
   const [registerData, setRegisterData] = useState<RegisterData>({
      username: "",
      email: "",
      password: "",
   });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setRegisterData({
         ...registerData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      fetchRegister(registerData);
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
