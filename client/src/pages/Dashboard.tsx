import axios from "axios";
import  { useEffect, useState } from "react";
import LoadingIcon from "../components/LoadingIcon";
import ContactItem from "../components/ContactItem";

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
    getAllUsers();
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
  const getAllUsers = async () => {
    if (data) {
      const Jdata = JSON.parse(data);
      try {
        const res = await axios.get(`${baseurl}all-users`, {
          headers: {
            token: Jdata.token,
          },
        });
        if (res) {
          setTimeout(() => {
            setUsers(res.data);
          }, 1000);
        }
      } catch (error) {
        setUsers([]);
      }
    } else {
      let x = {
        id: "undefined",
        email: "undefined",
        firstName: "undefined",
        lastName: "undefined",
      };
      //@ts-ignore
      setUsers([x]);
    }
  };
  return (
    <div className="min-h-[calc(100vh-72px-16px)] min-w-[60%] flex md:justify-center flex-col md:flex-row gap-y-4">
      <aside className="md:basis-[40%] flex justify-center h-full items-center">
        <div className="h-full w-full justify-center items-center flex flex-col md:my-10 md:py-20 px-4 py-5">
          {user.firstName && user.lastName && user.email && user.id ? (
            <>
              <span className="text-sm text-gray-300 py-4">{user.id}</span>{" "}
              <div className="overflow-hidden rounded-full w-[30%] border-dashed border text-center">
                {user.email !== "undefined" ? (
                  <img
                    className="w-full"
                    src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                    alt=""
                  />
                ) : (
                  "undefined"
                )}
              </div>
              <span className="capitalize mt-3 mb-2 text-xl font-semibold">
                {user.firstName} {user.lastName}
              </span>
              <div className="flex items-center flex-col gap-3 justify-center">
                <span>{user.email}</span>
                <span>Net Balance: {balance && balance}</span>
              </div>
            </>
          ) : (
            <LoadingIcon />
          )}
        </div>
      </aside>
      <section className="md:basis-[60%] h-full flex justify-center items-center flex-col">
        <div className="md:py-20 md:my-10 w-full  flex justify-center items-center flex-col gap-4 md:px-20 ">
          <h1 className="text-center my-5 text-3xl font-semibold">
            Transactions
          </h1>
          {users.length !== 0 ? (
            users.map((u, i) => <ContactItem user={u} key={i} />)
          ) : (
            <LoadingIcon />
          )}
        </div>
      </section>
    </div>
  );
}
