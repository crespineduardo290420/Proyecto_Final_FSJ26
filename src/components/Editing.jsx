import { useEffect } from "react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import accommodationGet from "../Services/getting";
import accommodationGetById from "../Services/gettingById";
import accommodationPut from "../Services/updating";
import AccommodationForm from "./AccommodationFormEditing";



function Editing() {
    const { register, handleSubmit, setValue } = useForm();
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const { id } = useParams();

    const update = async (data) => {
        try {
        const newInfo = await accommodationPut(id, data);
        navigate("/Dashboard");
        } catch (error) {
        console.error(`Can't be updated`);
        }
    };

    const getAccommodationById = async (id) => {
        const accomodations = await accommodationGet();

        const accommodationsId = await accomodations.map((data) => data.id);

        const numericId = Number(id);

        if (accommodationsId.some((place) => place === numericId)) {
        const placeById = await accommodationGetById(id);

        setValue("name", placeById.name);
        setValue("description", placeById.description);
        setValue("address", placeById.address);
        } else {
        console.log("no place found");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
          await getAccommodationById(id);
          setTimeout(() => setIsLoading(false), 3000);
        };
        fetchData();
      }, [id]);

    const toggleModal = () => {
        setIsModalOpen(false); // Cierra el modal
        navigate("/Dashboard"); // Redirige a la página principal
    };
    if (!isModalOpen) return null;
    
    if (isLoading) {
        return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white opacity-20">
                Cargando datos...
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 opacity-20">
                Espere un momento mientras cargamos la información.
            </p>
            <div
                role="status"
                className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
            >
                <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
            </div>
        </div>
        );
    }
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="overflow-y-auto p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-100 mt-10 mb-10 custom-scroll">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-800">Editar de Alojamiento</h1>
        <AccommodationForm
            handleSubmit={handleSubmit(update)}
            register={register}
            toggleModal={toggleModal}
        />
    </div>
</div>


    );
}

export default Editing;
