import React from 'react';

const AccommodationForm = ({ handleSubmit, register, toggleModal }) => {

  
  return (
    <form action="" onSubmit={handleSubmit} className="p-4 md:p-5">
      <div className="grid gap-4 mb-4 grid-cols-2">
        {/* Nombre */}
        <div className="col-span-2">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800 text-left">
            Nombre
            <span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-600 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nombre del alojamiento"
            required
            {...register("name")}
          />
        </div>

        {/* Dirección */}
        <div className="col-span-2">
          <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800 text-left">
            Dirección
            <span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            name="address"
            id="address"
            className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-600 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Dirección del alojamiento"
            required
            {...register("address")}
          />
        </div>

        {/* Descripción */}
        <div className="col-span-2">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800 text-left">
            Descripción
            <span className="text-red-500"> *</span>
          </label>
          <textarea
            id="description"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-600 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Descripción del alojamiento"
            {...register("description")}
          />
        </div>

        {/* Imagen */}
        <div className="col-span-2">
          <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800 text-left">
            Imagen
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-50 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-200 dark:bg-gray-100 hover:bg-gray-100 dark:border-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-200"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-blue-500 dark:text-blue-400">
                  <span className="font-semibold">Subir una imagen o arrastra y suelta</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF hasta 10MB</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
        </div>

        {/* Botones cancelar y guardar */}
        <div className="flex items-center mt-4 space-x-4 rtl:space-x-reverse border-t col-span-2 justify-end py-2">
          <button onClick={toggleModal} type="button" className="py-2.5 px-5 text-sm font-medium text-gray-400 focus:outline-none bg-transparent border-0 hover:bg-gray-100 rounded-lg hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-200">
            Cancelar
          </button>
          <button type="submit" className="w-50 text-black bg-[#d0db23] hover:bg-[#c0c72c] focus:ring-4 focus:outline-none focus:ring-[#a0b022] font-medium rounded-full text-sm px-5 py-2.5 text-center">
            Guardar cambios
          </button>
        </div>
      </div>
    </form>
  );
};

export default AccommodationForm;
