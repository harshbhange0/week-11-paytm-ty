import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const authContext = createContext({ auth: false }); // initial state is an object with an 'auth' property
export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ auth: false }); // state is also an object with an 'auth' property
  const baseurl = import.meta.env.VITE_BASE_URL;
  const data = localStorage.getItem("user");
  useEffect(() => {
    getAuth();
  }, []);

  const getAuth = async () => {
    if (data) {
      try {
        const Jdata = JSON.parse(data);
        const res = await axios.get(`${baseurl}auth-check`, {
          headers: {
            token: Jdata.token,
          },
        });
        console.log("res/auth", res.data.auth);
        setAuth({ ...auth, auth: res.data.auth }); // update state with an object with an 'auth' property
        console.log("setauth", auth);
      } catch (error) {
        setAuth({ auth: false }); // update state with an object with an 'auth' property
      }
    } else {
      setAuth({ auth: false }); // update state with an object with an 'auth' property
    }
  };

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
