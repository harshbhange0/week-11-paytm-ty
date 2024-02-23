import { MdSpaceDashboard } from "react-icons/md";
import { FaMoneyCheck } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";
import { MdAssignmentInd } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { useContext } from "react";
import { authContext } from "../context/auth";
import { Link, useNavigate } from "react-router-dom";
export default function SideNav() {
  const { auth } = useContext(authContext);
  const navigate = useNavigate();
  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {auth && auth ? (
              <>
                <li>
                  <Link
                    to="/auth/dashboard"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <MdSpaceDashboard />
                    <span className="ms-3">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="auth/dashboard/users"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <FaUserFriends />
                    <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/auth/dashboard/transaction"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <FaMoneyCheck />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Transaction
                    </span>
                    {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span> */}
                  </Link>
                </li>

                <li>
                  <button
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group "
                    onClick={() => {
                      localStorage.removeItem("user");
                      navigate("/");
                      location.reload();
                    }}
                  >
                    <IoIosLogOut />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Log Out
                    </span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <MdOutlineLogin />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Log In
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <MdAssignmentInd />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Register
                    </span>{" "}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </aside>
    </>
  );
}
