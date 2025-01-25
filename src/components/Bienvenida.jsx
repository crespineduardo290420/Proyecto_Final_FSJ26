import { useState, useEffect } from "react";
import landscape1 from "../assets/landscape1.jpg";
import landscape2 from "../assets/landscape2.jpg";
import landscape3 from "../assets/landscape3.jpg";
import landscape4 from "../assets/landscape4.jpg";
import { useNavigate } from 'react-router-dom';


const Bienvenida = () => {
  const images = [landscape1, landscape2, landscape3, landscape4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 40000); // Cambiar cada 40 segundos
    return () => clearInterval(interval);
  }, [images.length]);

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  return (
    <div
      className="flex relative w-full min-h-screen overflow-hidden"
      style={{ backgroundImage: `url(${images[currentImageIndex]})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Contenido principal */}
      <div className="fixed z-10 flex flex-col items-left justify-center h-full text-left text-white px-10 bg-opacity-50">
      <h1 className="text-3xl text-left md:text-3xl font-bold mb-4">
          ¡Bienvenido a la Plataforma Administrativa de Alojamientos y Reservaciones!
        </h1>
        <p className="text-base md:text-lg mb-8">
          Gestiona reservas, actualiza disponibilidad y revisa estadísticas clave en un solo lugar.<br />
          Si necesitas ayuda, nuestro equipo de soporte está listo para asistirte. ¡Gracias por tu confianza!
        </p>
        <div className="flex gap-4">
        <button
            onClick={handleLoginClick} // Llama a la función cuando se haga clic
            className="bg-[#D0DB23] text-black px-6 py-3 rounded-full font-semibold shadow-md hover:bg-[#97A000] hover:text-black transition-colors"
          >
            Iniciar sesión
          </button>
          <button
            className="border bg-[#011724] border-[#D0DB23] text-[#D0DB23] px-6 py-3 rounded-full font-semibold shadow-md hover:bg-[#D0DB23] hover:text-black transition-colors"
          >
            Registrar
          </button>
        </div>
      </div>

      {/* Pie de página */}
      <div
        className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#011724] to-transparent"
      ></div>
    </div>
  );
};

export default Bienvenida;
  