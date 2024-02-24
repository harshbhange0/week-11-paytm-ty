import { useContext } from "react";
import { userContext } from "../context/userContext";
import png from "/profile.png";

export default function Dashboard() {
  const { user } = useContext(userContext);

  return (
    <section className="h-[calc(100vh-60px-20px)] gap-5 flex justify-center items-center flex-col">
      <div className="w-20 text-stone-600 ">
        <img src={png} className="w-full" alt="avatar" />
      </div>
      <span className="capitalize text-xl font-semibold">
        Welcome, {user.firstName} {user.lastName}
      </span>
      <p className="text-sm text-gray-500">Click Users To Pay</p>
      <p className="text-sm text-gray-500">
        Click Transaction to see Payment History
      </p>
    </section>
  );
}
