import { FaSearch } from 'react-icons/fa';

function Nav() {
    return (
        <header className="z-[1000] flex justify-center pointer-events-none">
            <nav className="w-full max-w-6xl flex flex-col md:grid md:grid-cols-3 items-center px-4 md:px-5 py-1 pointer-events-auto gap-4">
                {/* Logo - Esquina izquierda (arriba en móvil) */}
                <div className="w-full md:w-auto flex justify-start order-1 md:order-none">
                    <a href="/">
                        <img 
                            src="./public/Buzen-logo.png" 
                            alt="Logo" 
                            className="h-16 md:h-20 w-16 md:w-20 opacity-90 hover:opacity-100 transition-opacity"
                        />
                    </a>
                </div>

                {/* Barra de búsqueda - Centrada (debajo en móvil) */}
                <div className="w-full md:w-auto flex justify-center order-3 md:order-none">
                    <div className="relative flex items-center w-full md:max-w-2xl">
                        <FaSearch className="absolute left-3 text-[var(--color-text-secondary)]" />
                        <input
                            type="search"
                            placeholder="Search Music..."
                            className="pl-10 pr-4 py-2 w-full rounded-full bg-transparent text-[var(--color-text-primary)] border border-[var(--color-text-secondary)]/30 focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                        />
                    </div>
                </div>

                {/* Menú de navegación - Derecha (centrado en móvil) */}
                <ul className="w-full md:w-auto flex justify-center md:justify-end gap-4 md:gap-8 list-none m-0 p-0 order-2 md:order-none flex-wrap">
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
            </nav>
        </header>
    );
}

export default Nav;