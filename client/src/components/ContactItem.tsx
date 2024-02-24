import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//@ts-ignore
export default function ContactItem({ user }) {
  const [q, setQ] = useState(false); // current user
  useEffect(() => {
    handlePay();
  }, []);
  const handlePay = () => {
    const data = localStorage.getItem("user");
    if (data) {
      const Jdata = JSON.parse(data);
      if (Jdata.id == user.id) {
        setQ(true);
      } else {
        setQ(false);
      }
    }
  };

  return (
    !q && (
      <>
        <Link
          to={`/auth/dashboard/payment/${user.id}`}
          className="w-full "
        >
          <div className="border px-3 rounded-md p-1 flex flex-row items-center gap-5 ">
            <div className="uppercase rounded-full text-sm font-semibold bg-blue-200/40 p-1">
              <span>{user ? user.firstName.substring(0, 1) : ""}</span>
              <span>{user ? user.lastName.substring(0, 1) : ""}</span>
            </div>
            <div>
              <span>{user ? user.firstName : "..."}</span>
              <span>{user ? user.lastName : "..."}</span>
            </div>
            <div className="ms-auto">
              <span className="text-[12px]">{user ? user.email : "..."}</span>
            </div>
          </div>
        </Link>
      </>
    )
  );
}
