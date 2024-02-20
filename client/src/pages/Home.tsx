import { Link } from "react-router-dom";
import github from "/github.png";

export default function Home() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-4 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            PayTs
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400 ">
            This project is a
            <span className="border-b"> React application (Full Stack) </span>
            that utilizes various technologies such as <br /> <br />
            <span className="border-b">
              Prisma, SQL, Nodejs, Express, TailwindCSS, flowbite (tailwindcss
              component library), Context API, Axios, JWT, Zod, and TypeScript.
            </span>{" "}
            <br /> <br />
            It provides features such as user authentication (login, register),
            transaction management, and balance tracking.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <Link
              to="/register"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Get started
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div>
          <div className="py-4 px-4 mx-auto max-w-screen-xl  lg:py-16">
            <div className="flex flex-col">
              <div className="flex flex-col gpa-3 mx-auto">
                <h1 className="text-2xl font-semibold text-center md:text-start">
                  Feature
                </h1>
                <h1 className="ps-4 font-semibold mt-3 mb-2">
                  1. User Authentication:
                </h1>
                <ul className="list-disc ms-20">
                  <li>
                    Register: Users can create a new account with a username and
                    password.
                  </li>
                  <li>
                    Login: Existing users can log in to access their account.
                  </li>
                </ul>
                <h1 className="ps-4 font-semibold mt-3 mb-2">
                  2. Transaction Management:
                </h1>
                <ul className="list-disc ms-20">
                  <li>
                    Users can perform transactions. <br />
                    with Prisma transaction management
                  </li>
                </ul>
                <h1 className="ps-4 font-semibold mt-3 mb-2">
                  3. Balance Tracking:
                </h1>
                <ul className="list-disc ms-20">
                  <li>
                    Users can view their current balance after transactions.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <a
          className="w-auto"
          href="https://github.com/harshbhange0/week-11-paytm-ty"
          target="_blank"
        >
          <img src={github} className="w-7 mx-auto block" alt="" />
        </a>
      </section>
    </>
  );
}
