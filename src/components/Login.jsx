import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaLock, FaKey, FaQuestionCircle  } from 'react-icons/fa';
import { IoInformationCircleSharp } from "react-icons/io5";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://apibookingsaccomodations-production.up.railway.app/api/V1/login',
        {
          username,
          password,
        }
      );
      setMessage(`Login successful: ${response.data.message}`);
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'An error occurred during login.'
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('./assets/lanscape1.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h1>
        <div className="flex items-center justify-center text-2xl font-bold text-center mb-6">
          <IoInformationCircleSharp className="text-gray-400 mr-2" />
          <p className="text-sm font-medium text-gray-700">Ingresa tus Credenciales para Acceder al Sistema</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Usuario:</label>
            <div className="flex items-center mt-1">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Correo@Ejemplo.com"
              />
            </div>
          </div>
         
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña:</label>
            <div className="flex items-center mt-1">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="**********"
              />
            </div>
            <div className="flex items-end justify-center text-2xl font-bold text-center mb-6 mt-5 ml-36 cursor-pointer ">
          <FaKey className="text-gray-400 mr-2" />
          <p className="text-sm font-medium text-gray-700 hover:text-blue-800 transition-colors">¿Olvidaste tu Contraseña?</p>
        </div>
          </div>
    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-300 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Iniciar Sesión</button>
        
        <div className="flex items-center justify-center text-center mb-6 mt-5 cursor-pointer">
                <FaQuestionCircle className="text-gray-400 mr-2 text-2xl" />
                <span className="text-sm font-bold text-gray-700">¿Necesitas Ayuda?</span>
                 <span className="text-sm font-medium text-gray-700 hover:text-blue-800 transition-colors ml-2">Contacta Soporte</span>
        </div>

        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
