
import axios from "axios";
import { toast } from "react-toastify";
import SetLocal from "./SetLocal";

export default async function getBalance() {
  const baseurl = import.meta.env.VITE_BASE_URL;
  const user = localStorage.getItem("user");
  let jUser;
  if (user) {
    jUser = JSON.parse(user);
  }
  try {
    const res = await axios.post(`${baseurl}balance/${jUser.token}`);
    toast.success(res.data.msg);
    SetLocal("balance", JSON.stringify(res.data));
    if (!res) {
      toast.error("User register Failed");
    }
  } catch (error) {
    toast.error("Server Error");
    console.log(error);
  }
}
