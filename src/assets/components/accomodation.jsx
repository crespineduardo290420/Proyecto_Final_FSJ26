import React, { useEffect, useState } from "react";
import accommodationGet from "../Services/getting";
import { Link } from "react-router-dom";

import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot,  faCircleInfo, faCirclePlus, faPencil} from '@fortawesome/free-solid-svg-icons';





function Accommodation({ setIsModalOpen }) {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true); 

  //   const [isAuthenticated, setIsAuthenticated] = useState(false)

  

  const fetchData = async () => {
    try {
      setLoading(true); // Activar "Cargando" antes de la petición
      const response = await accommodationGet();
      setAccommodations(response);
    } catch (error) {
      console.error("Error fetching accommodations:", error);
    } finally {
      setLoading(false); // Desactivar "Cargando" después de completar la petición
    }
  };

  useEffect(() => {
    // const session = sessionStorage.getItem("api-token");
    // if (session) {
    //   setIsAuthenticated(true);
    // } else {
    //   setIsAuthenticated(false);
    // }
    fetchData();
  }, []);
  const id = accommodations.map((data) => data.id);
  console.log(id);
  console.log(accommodations);

  const capturingID = async (id) => {
    // await accommodationPut(id);
    const selectedAccommodation = accommodations.find((item) => item.id === id);
    if (selectedAccommodation) {
      console.log("Accommodation Details:", selectedAccommodation);
    } else {
      console.log(`No accommodation found with ID: ${id}`);
    }  
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">Alojamientos</h1>
        <button
            onClick={toggleModal}
            className="block text-black bg-[#d0db23] hover:bg-[#c0c72c] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center "
            type="button"
          >
          <FontAwesomeIcon icon={faCirclePlus} size="1x" className="mr-2" />

            Nuevo Alojamiento
          </button>
      </div>


    {/* Mostrar indicador de carga si está en proceso */}
    {loading ? (
        <div className="flex flex-col gap-4 w-full h-screen items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
        </div>
        <p className="text-gray-500">Cargando alojamientos...</p>
      </div>
      
      ) : (

      <ul className="space-y-4">
        {accommodations.map((item) => (
          <li
            key={item.id}
            className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
          >
            <div className="flex items-center space-x-4"> {/* Contenedor flex para la imagen y la información */}
            {/* Image */}
            <img 
              src={item.image} 
              alt="Imagen" 
              className="w-16 h-16 object-cover rounded-full" 
            />

            {/* info */}

            <div> 
              <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>

              <p className="text-sm text-gray-600 flex items-center">
              <span className="mr-1">
                <FontAwesomeIcon icon={faLocationDot} size="1x" className="mr-2" />
              </span>
              {item.address}
              </p>

              <p className="text-sm text-gray-600 flex items-center mt-2">
                <FontAwesomeIcon icon={faCircleInfo} size="1x" className="mr-2 align-middle" />
                {item.description}
              </p>
              
              
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => capturingID(item.id)}
              >          
              <Link to={`/update/${item.id}`}><FontAwesomeIcon icon={faPencil} size="1x" className="mr-2" /></Link>

                
                
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => console.log("Delete", item.id)}
              >
                <FaTrashAlt />
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
    </div>
  );
}

export default Accommodation;
