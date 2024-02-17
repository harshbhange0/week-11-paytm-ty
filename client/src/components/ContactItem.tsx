import { Link } from "react-router-dom";

//@ts-ignore
export default function ContactItem({ user }) {
  return (
    <div className="w-full border hover:bg-blue-100/50 transition border-blue-200 bg-blue-100/20 rounded-md  p-3 flex justify-between items-center flex-row">
      <div className="flex gap-2 text-xl capitalize">
        <span>{user.firstName ? user.firstName : "..."}</span>
        <span>{user.lastName ? user.lastName : "..."}</span>
      </div>
      <Link
        className="bg-green-500 transition hover:bg-green-400 text-white px-2 py-1 rounded-md"
        to={`/auth/dashboard/payment/${user.id}`}
      >
        Pay
      </Link>
    </div>
  );
}
