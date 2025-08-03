import { FaSearch } from 'react-icons/fa';
import Darkmode from "./Darkmode";

function Nav() {
    return (
        <header className="z-[1000] flex justify-center pointer-events-none">
            <nav className="w-full max-w-6xl flex flex-col md:grid md:grid-cols-3 items-center px-4 md:px-5 py-1 pointer-events-auto gap-4">
                {/* Logo - Esquina izquierda */}
                <div className="w-full md:w-auto flex justify-start order-1 md:order-none">
                    <a href="/">
                        <img 
                            src="./public/Buzen-logo.png" 
                            alt="Logo" 
                            className="h-16 md:h-20 w-16 md:w-20 opacity-90 hover:opacity-100 transition-opacity dark:invert"
                        />
                    </a>
                </div>

                {/* Barra de búsqueda */}
                <div className="w-full md:w-auto flex justify-center order-3 md:order-none">
                    <div className="relative flex items-center w-full md:max-w-2xl">
                        <FaSearch className="absolute left-3 text-[var(--color-text-secondary)] dark:text-[var(--color-text-primary)]" />
                        <input
                            type="search"
                            placeholder="Search Music..."
                            className="pl-10 pr-4 py-2 w-full rounded-full bg-transparent text-[var(--color-text-primary)] border border-[var(--color-text-secondary)]/30 focus:border-[var(--color-accent)] focus:outline-none transition-colors dark:placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* Menú de navegación y Dark Mode - Ahora en un solo contenedor flex */}
                <div className="flex items-center justify-end gap-6 order-2 md:order-none">
                    <ul className="flex gap-4 md:gap-8 list-none m-0 p-0">
                        <li>
                            <a 
                                href="#"
                                className="flex items-center gap-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent)] font-bold transition-colors text-sm md:text-base whitespace-nowrap"
                            >
                                <span>Home</span>
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#"
                                className="flex items-center gap-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent)] font-bold transition-colors text-sm md:text-base whitespace-nowrap"
                            >
                                <span>Premium</span>
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#"
                                className="flex items-center gap-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent)] font-bold transition-colors text-sm md:text-base whitespace-nowrap"
                            >
                                <span>Sign in</span>
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#"
                                className="flex items-center gap-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent)] font-bold transition-colors text-sm md:text-base whitespace-nowrap"
                            >
                                <span>Sign Up</span>
                            </a>
                        </li>
                    </ul>
                    <div className="flex items-center">
                        <Darkmode />
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Nav;