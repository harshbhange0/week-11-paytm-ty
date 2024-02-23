import axios from "axios";
import { useEffect, useState } from "react";
import LoadingIcon from "../components/LoadingIcon";
import ContactItem from "../components/ContactItem";
import TrHistoryWarper from "../components/TrHistoryWarper";

export default function Dashboard() {
  const data = localStorage.getItem("user");
  const [user, setUser] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const [balance, setBalance] = useState(0);
  const [users, setUsers] = useState([]);
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

  return <main></main>;
}
