import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Darkmode = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Inicialización del estado
  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Priorizar el localStorage sobre la preferencia del sistema
      const initialMode = savedMode !== null ? savedMode === 'true' : systemPrefersDark;
      setDarkMode(initialMode);
    }
  }, []);

  // Aplicar cambios cuando darkMode cambia
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
      }
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 hover:scale-105 transition-transform focus:outline-none"
      aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
    </button>
  );
};

export default Darkmode;