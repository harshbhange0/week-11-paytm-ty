import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SetLocal from "./SetLocal";

interface User {
  email: string;
  password: string;
}
export default async function useLogin(user: User) {
  const baseurl = import.meta.env.VITE_BASE_URL;

  try {
    const res = await axios.post(`${baseurl}login`, {
      email: user.email,
      password: user.password,
    });
    toast.success(res.data.msg);
    SetLocal("user", JSON.stringify(res.data));
    if (!res) {
      toast.error("User register Failed");
    }
  } catch (error) {
    toast.error("Server Error");
    console.log(error);
  }
}
