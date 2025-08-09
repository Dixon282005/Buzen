import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Darkmode = () => {
  const [darkMode, setDarkMode] = useState(true); // por defecto oscuro

  // Detectar preferencia inicial
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode");
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      // Si hay valor guardado, úsalo; si no, usa preferencia del sistema
      const initialMode = savedMode !== null ? savedMode === "true" : systemPrefersDark;
      setDarkMode(initialMode);

      // Aplicar la clase "dark" si initialMode es true (modo oscuro)
      document.documentElement.classList.toggle("dark", initialMode);
    }
  }, []);

  // Aplicar cambios cuando darkMode cambia
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Aquí sí debe coincidir darkMode con la clase "dark"
      document.documentElement.classList.toggle("dark", darkMode);
      localStorage.setItem("darkMode", darkMode);
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(prev => !prev)}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 hover:scale-105 transition-transform focus:outline-none"
      aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {darkMode ? <FaMoon size={16} /> : <FaSun size={16} />}
    </button>
  );
};

export default Darkmode;
