import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingIcon from "../components/LoadingIcon";
import { toast } from "react-toastify";

export default function PaymentGate() {
  const data = localStorage.getItem("user");
  const baseurl = import.meta.env.VITE_BASE_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);
  const [user, setUser] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const [amount, setAmount] = useState("");
  const getUser = async () => {
    if (data) {
      const Jdata = JSON.parse(data);

      try {
        const res = await axios.get(`${baseurl}user/${id}`, {
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
  const handleSubmit = async () => {
    if (data) {
      const Jdata = JSON.parse(data);
      try {
        const res = await axios.post(
          `${baseurl}/transaction/${Jdata.id}`,
          {
            to: id,
            amount: amount,
          },
          {
            headers: { token: Jdata.token },
          }
        );
        if (res.data.msg) {
          toast.success(res.data.msg);
          setAmount("");
          navigate("/auth/dashboard");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.msg);
        setAmount("");
      }
    }
  };
  return (
    <div className="flex justify-center items-center h-[calc(100vh-72px-16px)] flex-col px-2">
      <div className=" w-full sm:w-[60%] md:w-[35%] h-[45%] sm:border flex justify-around flex-col rounded-md">
        <div className="flex flex-col pt-6 px-4 mb-2 text-md text-center gap-4 font-medium text-gray-900 dark:text-white">
          <div className="w-20 mx-auto block rounded-full overflow-hidden sm:border">
            <img
              className="w-full"
              src="https://xsgames.co/randomusers/avatar.php?g=pixel"
              alt=""
            />
          </div>
          {user.email && user.lastName && user.firstName ? (
            <>
              <span>Paying to : {user.firstName + " " + user.lastName}</span>
              <span>Email : {user.email}</span>
            </>
          ) : (
            <div className="w-full flex justify-center items-center">
              <LoadingIcon />
            </div>
          )}
        </div>
        <form className="max-w-sm mx-auto flex justify-center items-center flex-col gap-2">
          <input
            type="number"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-center"
            placeholder="amount in Rs"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />{" "}
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mx-auth block dark:bg-blue-600 dark:hover:bg-blue-700 w-[60%] dark:focus:ring-blue-800"
            onClick={(e) => {
              e.preventDefault();
              if (amount == "") {
                toast.warn("Please enter amount");
              } else {
                handleSubmit();
              }
            }}
          >
            Pay
          </button>
        </form>
      </div>
    </div>
  );
}
