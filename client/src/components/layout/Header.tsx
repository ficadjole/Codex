import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuthHook";

import { FaBookOpen } from "react-icons/fa";
import { FiSearch, FiShoppingCart, FiHeart } from "react-icons/fi";
import { HiOutlineUser } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";

export default function Header() {
    const { user, isAuthenticated, logout } = useAuth();

    const [showSearch, setShowSearch] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    return (
        <header className="w-full bg-black text-white px-8 py-4 flex items-center justify-between">

            <div className="flex items-center gap-2 text-xl font-bold">
                <FaBookOpen className="text-green-500" />
                <Link to="/">BookStore</Link>
            </div>

            <nav className="hidden md:flex gap-8 text-sm uppercase tracking-wide">
                <Link to="/" className="hover:text-green-400 transition">
                    Naslovna
                </Link>
                <Link to="/blog" className="hover:text-green-400 transition">
                    Blog
                </Link>
                <Link to="/news" className="hover:text-green-400 transition">
                    Novosti
                </Link>
            </nav>

            <div className="flex items-center gap-6 relative">

                <div className="relative flex items-center">

                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className={`absolute right-8 bg-white text-black px-3 py-1 rounded shadow transition-all duration-300
      ${showSearch ? "w-56 opacity-100" : "w-0 opacity-0 pointer-events-none"}
    `}
                    />

                    <button
                        onClick={() => setShowSearch(!showSearch)}
                        className="hover:text-green-400 transition z-10"
                    >
                        <FiSearch size={20} />
                    </button>
                </div>

                <Link to="/cart" className="hover:text-green-400 transition">
                    <FiShoppingCart size={20} />
                </Link>

                <Link to="/wishlist" className="hover:text-green-400 transition">
                    <FiHeart size={20} />
                </Link>

                {!isAuthenticated ? (
                    <Link to="/login" className="flex items-center gap-1 hover:text-green-400 transition">
                        <HiOutlineUser size={20} />
                        Login
                    </Link>
                ) : (
                    <div className="flex items-center gap-3">
                        <span className="text-green-400 font-medium leading-none">
                            {user?.username}
                        </span>

                        <div className="relative group flex items-center">
                            <button
                                onClick={logout}
                                className="flex items-center justify-center text-red-400 hover:text-red-300 transition"
                            >
                                <FiLogOut size={20} />
                            </button>

                            <span className="absolute -bottom-7 left-1/2 -translate-x-1/2
                     bg-gray-800 text-white text-xs px-2 py-1 rounded
                     opacity-0 group-hover:opacity-100 transition">
                                Logout
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}