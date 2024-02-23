import { useEffect, useState } from 'react'
import ContactItem from '../components/ContactItem';
import LoadingIcon from '../components/LoadingIcon';
import axios from 'axios';

export default function DisplayUsers() {
    const [users, setUsers] = useState([]);
    const baseurl = import.meta.env.VITE_BASE_URL;
    const data = localStorage.getItem("user");
    useEffect(()=>{
        getAllUsers();
    },[])
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
    <>
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
            </>
  )
}
