import "../App.css"
import React, { useEffect, useState } from "react"
import Accommodation from "./accomodation"

import { useNavigate } from "react-router-dom";
import CalendarBooking from './CalendarBooking';


function Dashboard() {
  // Estado para manejar el componente activo
  const [activeComponent, setActiveComponent] = useState("accommodation")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate();

  // Función para cambiar el componente según la opción seleccionada
  const handleClick = (component) => {
    setActiveComponent(component)
  }

  const handleLogout = () => {
    sessionStorage.removeItem("api-token");
    navigate("/");
  };

  const validUser = () => {
    const token = sessionStorage.getItem("api-token");
    if (!token) {
      return navigate("/");
    }
  };

  useEffect(() => {
    validUser();
  }, []);
  return (
    <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-6 overflow-y-auto bg-gray-50 dark:bg-white">
          <a href="#" className="flex items-center ps-2.5 mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              className="h-6 me-3 sm:h-7"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"
              />
            </svg>
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-black">Dashboard</span>
          </a>
          <ul className="space-y-2 font-medium">
          <li>
            <a
              href="#"
              onClick={() => handleClick("accommodation")}
              className={`flex items-center p-2 rounded-lg group ${
                activeComponent === "accommodation"
                  ? "text-blue-500 bg-blue-100 dark:bg-blue-100"
                  : "text-gray-900 hover:bg-blue-100 dark:text-bark dark:hover:bg-blue-300"
              }`}
            >
              <svg
                className={`flex-shrink-0 w-5 h-5 transition duration-75 ${
                  activeComponent === "accommodation"
                    ? "text-blue-500 dark:text-blue-600"
                    : "text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-blue-600"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                width="56"
                height="56"
                viewBox="0 0 56 56"
              >
                <path
                  fill="currentColor"
                  d="M.625 27.824c0 1.125.89 1.805 1.992 1.805c.68 0 1.219-.328 1.688-.797L27.18 7.996c.257-.258.539-.352.843-.352c.282 0 .54.094.82.352l22.852 20.836c.492.469 1.031.797 1.688.797c1.101 0 1.992-.68 1.992-1.805c0-.703-.258-1.148-.703-1.547l-8.11-7.382V5.043c0-1.031-.656-1.687-1.687-1.687h-3.07c-1.008 0-1.711.656-1.711 1.687v7.969l-9.282-8.485C29.992 3.754 28.984 3.38 28 3.38c-.985 0-1.969.375-2.813 1.148L1.328 26.277c-.422.399-.703.844-.703 1.547m6.703 19.664c0 3.258 1.969 5.157 5.273 5.157h9.493V35.98c0-1.078.726-1.78 1.804-1.78h8.274c1.078 0 1.781.702 1.781 1.78v16.665h9.469c3.304 0 5.25-1.899 5.25-5.157V30.332l-19.899-17.93c-.258-.234-.539-.351-.82-.351c-.258 0-.516.117-.797.375L7.328 30.449Z"
                />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Alojamientos</span>
            </a>
          </li>

          <li>
            <a
              href="#"
              onClick={() => handleClick("reservations")}
              className={`flex items-center p-2 rounded-lg group ${
                activeComponent === "reservations"
                  ? "text-blue-500 bg-blue-100 dark:bg-blue-100"
                  : "text-gray-900 hover:bg-blue-100 dark:text-bark dark:hover:bg-blue-300"
              }`}
            >
              <svg
                className={`flex-shrink-0 w-5 h-5 transition duration-75 ${
                  activeComponent === "reservations"
                    ? "text-blue-500 dark:text-blue-600"
                    : "text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-blue-600"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16V4H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5"
                />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Reservaciones</span>
            </a>
          </li>

          </ul>
          
          
        </div>

        <div className=" border-t border-gray-300  absolute bottom-0 w-full px-3 py-4">
          <button
            onClick={handleLogout}
            className=" w-full text-center text-black hover:bg-gray-200 transition-all rounded-md"
          >
            Cerrar Sesión
          </button>
        </div>

      </aside>

      <div className="p-4 sm:ml-80">
        {activeComponent === "accommodation" ? (
          <Accommodation isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        ) : (
          <CalendarBooking />
        )}
      </div>
    </div>
  )
}
export default Dashboard

