import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../context/auth";
export default function Nav() {
  const navigate = useNavigate();
  const { auth } = useContext(authContext);

  //@ts-ignore
  const NAvLink = ({ isActive }): string => {
    return `block py-2 px-3  rounded md:bg-transparent  md:p-0 dark:text-white md:dark:text-blue-500
    ${isActive ? "bg-blue-700 text-white md:text-blue-700" : "text-gray-900"}
    `;
  };
  return (
    <>
      <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-end md:justify-center mx-auto p-4">
          <button
            data-collapse-toggle="navbar-solid-bg"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-solid-bg"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-solid-bg"
          >
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <li>
                <NavLink to="/" className={NAvLink} aria-current="page">
                  Home
                </NavLink>
              </li>
              {auth ? (
                <>
                  <li>
                    <NavLink to="/auth/dashboard" className={NAvLink}>
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button
                      className="block py-2 px-3  rounded md:bg-transparent  md:p-0 dark:text-white md:dark:text-blue-500"
                      onClick={() => {
                        localStorage.removeItem("user");
                        navigate("/");
                        location.reload();
                      }}
                    >
                      Log out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/register" className={NAvLink}>
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login" className={NAvLink}>
                      Log in
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
