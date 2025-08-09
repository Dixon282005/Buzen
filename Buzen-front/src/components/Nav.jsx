import { FaSearch } from 'react-icons/fa';
import Darkmode from "./Darkmode";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <header className="z-[1000] flex justify-center pointer-events-none bg-transparent mb-6">
      <nav className="w-full max-w-6xl px-4 md:px-5 py-4 pointer-events-auto
                      flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-x-16 items-center">

        {/* Logo */}
        <div className="flex justify-start w-full md:w-auto order-1 md:order-1">
          <a href="/">
            <img
              src="./public/Buzen-logo.png"
              alt="Logo"
              className="h-16 md:h-20 w-16 md:w-20 opacity-90 hover:opacity-100 transition-opacity dark:invert"
            />
          </a>
        </div>

        {/* Barra de búsqueda */}
        <div className="flex justify-center w-full md:w-auto order-3 md:order-2">
          <div className="relative flex items-center w-full md:max-w-2xl">
            <FaSearch className="absolute left-3 text-[var(--color-text-secondary)] dark:text-[var(--color-text-primary)]" />
            <input
              type="search"
              placeholder="Search Music..."
              className="pl-10 pr-4 py-2 w-full rounded-full bg-transparent text-[var(--color-text-primary)] border border-[var(--color-text-secondary)]/30 focus:border-[var(--color-accent)] focus:outline-none transition-colors dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Menú + Darkmode */}
    <div className="flex justify-end items-center gap-6 w-full md:w-auto order-2 md:order-3">
  <ul className="flex gap-6 md:gap-8 list-none m-0 p-0">
    <li>
      <Link
        to="/"
        className="flex items-center gap-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent)] font-bold transition-colors text-sm md:text-base whitespace-nowrap"
      >
        <span>Home</span>
      </Link>
    </li>
    <li>
      <Link
        to="/premium"
        className="flex items-center gap-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent)] font-bold transition-colors text-sm md:text-base whitespace-nowrap"
      >
        <span>Premium</span>
      </Link>
    </li>
    <li>
      <Link
        to="/login"
        className="flex items-center gap-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent)] font-bold transition-colors text-sm md:text-base whitespace-nowrap"
      >
        <span>Sign in</span>
      </Link>
    </li>
    <li>
      <Link
        to="/register"
        className="flex items-center gap-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent)] font-bold transition-colors text-sm md:text-base whitespace-nowrap"
      >
        <span>Sign Up</span>
      </Link>
    </li>
  </ul>
  <Darkmode />
</div>
      </nav>
    </header>
  );
}

export default Nav;
