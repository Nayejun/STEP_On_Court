import { LoginData } from "@/app/types/types";
import { fetchLogin } from "@/app/utils/api";
import React, { useState } from "react";

function Login() {
   const [loginData, setLoginData] = useState<LoginData>({
      email: "",
      password: "",
   });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginData({
         ...loginData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
         const res = await fetchLogin(loginData);
         localStorage.setItem("accessToken", res.token);
      } catch (err) {
         console.error(err);
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
