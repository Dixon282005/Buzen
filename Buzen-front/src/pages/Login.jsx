import { useState } from "react";

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al iniciar sesión");
        return;
      }

      console.log("Login exitoso:", data);
      // Aquí podrías redirigir al Dashboard:
      // navigate('/');
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen px-4">
      <div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-[var(--color-dark-purple)] border border-[var(--color-text-secondary)]/30">
        <h1 className="text-2xl font-bold mb-6 text-[var(--color-text-primary)] text-center">
          Iniciar Sesión
        </h1>

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Usuario o Correo */}
          <div>
            <label
              htmlFor="usernameOrEmail"
              className="block mb-1 text-sm text-[var(--color-text-secondary)]"
            >
              Usuario o Correo
            </label>
            <input
              type="text"
              id="usernameOrEmail"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              placeholder="Tu usuario o correo"
              className="w-full px-4 py-2 rounded-lg bg-transparent border border-[var(--color-text-secondary)]/30 text-[var(--color-text-primary)] placeholder-gray-400 focus:outline-none focus:border-[var(--color-accent)] transition"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm text-[var(--color-text-secondary)]"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-transparent border border-[var(--color-text-secondary)]/30 text-[var(--color-text-primary)] placeholder-gray-400 focus:outline-none focus:border-[var(--color-accent)] transition"
            />
          </div>

          {/* Botón de login */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-[var(--color-accent)] text-white font-bold hover:opacity-90 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
