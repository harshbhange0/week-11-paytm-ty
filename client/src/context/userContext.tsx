import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const userContext = createContext({
  user: { id: "", email: "", firstName: "", lastName: "" },
  balance: 0,
});

export default function UserProvider({ children }) {
  const data = localStorage.getItem("user");
  const [user, setUser] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const [balance, setBalance] = useState(0);
  const baseurl = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    getUser();
    getBalance();
   
  }, []);
  const getBalance = async () => {
    if (data) {
      const Jdata = JSON.parse(data);
      try {
        const res = await axios.get(`${baseurl}balance/${Jdata.id}`, {
          headers: {
            token: Jdata.token,
          },
        });
        if (res) {
          setBalance(res.data.balance);
        }
      } catch (error) {}
    }
  };
  const getUser = async () => {
    if (data) {
      const Jdata = JSON.parse(data);
      try {
        const res = await axios.get(`${baseurl}user/${Jdata.id}`, {
          headers: {
            token: Jdata.token,
          },
        });
        setTimeout(() => {
          setUser({
            id: res.data.id,
            email: res.data.email,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
          });
        }, 1000);
      } catch (error) {
        console.log(error);
        setUser({
          id: "undefined",
          email: "undefined",
          firstName: "undefined",
          lastName: "undefined",
        });
      }
    } else {
      setUser({
        id: "undefined",
        email: "undefined",
        firstName: "undefined",
        lastName: "undefined",
      });
    }
  };
 
  return (
    <userContext.Provider value={{ user, balance }}>
      {children}
    </userContext.Provider>
  );
}
