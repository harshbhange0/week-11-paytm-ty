import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SetLocal from "../utils/SetLocal";
import axios from "axios";
import { toast } from "react-toastify";
export default function Register() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  async function handleSubmit() {
    const baseurl = import.meta.env.VITE_BASE_URL;
    if (
      user.email === "" ||
      user.password === "" ||
      user.firstName == "" ||
      user.lastName === ""
    ) {
      setErrorMsg(true);
      setUser({ email: "", password: "", firstName: "", lastName: "" });
      setTimeout(() => {
        setErrorMsg(false);
      }, 500);
    } else {
      try {
        const res = await axios.post(`${baseurl}register`, {
          email: user.email,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
        });
        toast.success(res.data.msg);
        SetLocal("user", JSON.stringify(res.data));
        navigate("/auth/dashboard");
        location.reload();
        if (!res) {
          toast.error("User register Failed");
          setErrorMsg(true);
          setUser({ email: "", password: "", firstName: "", lastName: "" });
          setTimeout(() => {
            setErrorMsg(false);
          }, 500);
        }
      } catch (error: any) {
        toast.error(error.response.data.msg);
        if (error.response.data.type == "password") {
          toast.error(error.response.data.type + " " + error.response.data.msg);
        }
        setErrorMsg(true);
        setUser({ email: "", password: "", firstName: "", lastName: "" });
        setTimeout(() => {
          setErrorMsg(false);
        }, 500);
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-[calc(100vh-72px-16px)] flex-col px-2">
      <form className="max-w-lg w-full px-5 sm-px-0 mx-auto border py-10 rounded-xl">
        <h1 className="text-4xl mb-10 text-center">Register</h1>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              value={user.firstName}
              onChange={(e) => {
                setUser({ ...user, firstName: e.target.value });
              }}
              className={`${
                errorMsg && "border-red-500"
              } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
              placeholder=" "
              required
              autoComplete="off"
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_last_name"
              id="floating_last_name"
              value={user.lastName}
              onChange={(e) => {
                setUser({ ...user, lastName: e.target.value });
              }}
              className={`${
                errorMsg && "border-red-500"
              } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
              placeholder=" "
              required
              autoComplete="off"
            />
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last name
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            aria-describedby="floating_email_label"
            className={`${
              errorMsg && "border-red-500"
            } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
            required
            autoComplete="off"
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="floating_password"
            id="floating_password"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            className={`${
              errorMsg && "border-red-500"
            } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
            required
            autoComplete="off"
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <button
          type="submit"
          className={`${
            errorMsg ? "focus:ring-red-300" : "focus:ring-blue-300"
          } text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full mx-auto block  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Submit
        </button>
      </form>
      <span className="my-4">
        Already have account{" "}
        <Link to="/login" className="text-blue-400 underline">
          Log in
        </Link>
      </span>
    </div>
  );
}
