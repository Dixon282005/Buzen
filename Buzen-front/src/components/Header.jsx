import { useState } from 'react'

function Nav() {
    return (
        <header className="sticky top-4 z-[1000] flex justify-center pointer-events-none">
            <nav className="w-full max-w-7xl flex justify-between items-center py-3 px-8 bg-white/80 backdrop-blur-md  pointer-events-auto transition duration-300">


                <div className="flex items-center gap-6">
                    <a href="/">
                        <img src="./public/Buzen-logo.png" alt="Logo" className=" h-20 w-auto" />
                    </a>

                    <input
                        type="search"
                        placeholder="Search Music..."
                        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Derecha: Menú de navegación */}
                <ul className="flex gap-6 list-none m-0 p-0">
                    <li>
                        <a href="#" className="inline-block font-semibold text-base px-6 py-2 rounded-md  text-gray-600 hover:bg-amber-500 transform hover:-translate-y-[3px] transition duration-300">
                            Sign in
                        </a>
                    </li>
                    <li>
                        <a href="#" className="inline-block font-semibold text-base px-6 py-2 rounded-md text-gray-600 hover:bg-amber-500 transform hover:-translate-y-[3px] transition duration-300">
                            Sign Up
                        </a>
                    </li>
                    <li>
                        <a href="#" className="inline-block font-semibold text-base px-6 py-2 rounded-md  text-gray-600 hover:bg-amber-500 transform hover:-translate-y-[3px] transition duration-300">
                            Premium
                        </a>
                    </li>
                    <li>
                        <a href="#" className="inline-block font-semibold text-base px-6 py-2 rounded-md  text-gray-600 hover:bg-amber-500 transform hover:-translate-y-[3px] transition duration-300">
                            Home
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Nav;
