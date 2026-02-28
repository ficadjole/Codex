import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuthHook";

import { FiSearch, FiShoppingCart, FiHeart } from "react-icons/fi";
import { HiOutlineUser } from "react-icons/hi";
import { ChevronDown } from "lucide-react";

export default function Header() {
    const { user, isAuthenticated, logout } = useAuth();

    const [showSearch, setShowSearch] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [showMenu, setShowMenu] = useState(false);

    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setShowMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        // Kad se promeni auth state (login ili logout)
        // dropdown se uvek resetuje
        setShowMenu(false);
    }, [isAuthenticated]);

    return (
        <header
            className="w-full sticky top-0 z-50
                        bg-gradient-to-r from-[#0C1618] via-[#152A2E] to-[#0C1618]
                        border-b border-[#1F3337]
                        px-8 py-4 flex items-center justify-between
                        shadow-[0_4px_20px_rgba(40,98,58,0.15)]"
        >
            <div className="flex items-center gap-4">
                <img
                    src="/Simbol1.png"
                    alt="Dekaton logo"
                    className="h-12 brightness-0 invert drop-shadow-[0_0_8px_rgba(63,138,75,0.6)]"
                />

                <Link
                    to="/"
                    className="text-3xl uppercase tracking-[0.2em]
                        font-[Cinzel]
                        text-[#BFC9CA]
                        hover:text-[#3F8A4B]
                        transition duration-300"
                >
                    DEKATON
                </Link>
            </div>

            <nav className="hidden md:flex gap-10 text-base uppercase tracking-wider text-[#9DB7AA]">
                <Link to="/" className="hover:text-[#3F8A4B] transition">
                    Naslovna
                </Link>
                <Link to="/blog" className="hover:text-[#3F8A4B] transition">
                    Blog
                </Link>
                <Link to="/news" className="hover:text-[#3F8A4B] transition">
                    Novosti
                </Link>
            </nav>

            <div className="flex items-center gap-7 relative">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className={`absolute right-8 bg-[#142326] text-[#EAF4EF]
                        px-3 py-1 rounded-lg border border-[#1F3337]
                        transition-all duration-300
                        ${showSearch
                                ? "w-56 opacity-100"
                                : "w-0 opacity-0 pointer-events-none"
                            }`}
                    />

                    <button
                        onClick={() => setShowSearch(!showSearch)}
                        className="text-[#9DB7AA] hover:text-[#3F8A4B] transition z-10"
                    >
                        <FiSearch size={20} />
                    </button>
                </div>

                <Link
                    to="/cart"
                    className="text-[#9DB7AA] hover:text-[#3F8A4B] transition"
                >
                    <FiShoppingCart size={20} />
                </Link>

                <Link
                    to="/wishlist"
                    className="text-[#9DB7AA] hover:text-[#3F8A4B] transition"
                >
                    <FiHeart size={20} />
                </Link>

                {!isAuthenticated ? (
                    <Link
                        to="/login"
                        className="flex items-center gap-2 text-[#9DB7AA] hover:text-[#3F8A4B] transition"
                    >
                        <HiOutlineUser size={20} />
                        Login
                    </Link>
                ) : (
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="flex items-center gap-2 text-[#3F8A4B] font-medium hover:text-white transition"
                        >
                            {user?.username}
                            <ChevronDown
                                size={18}
                                className={`transition-transform duration-300 ${showMenu ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        <div
                            className={`absolute right-0 mt-3 w-44
                                bg-[#142326] border border-[#1F3337]
                                rounded-lg shadow-lg py-2
                                transform transition-all duration-200
                                ${showMenu
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-2 pointer-events-none"
                                }`}
                        >
                            <Link
                                to="/profile"
                                className="block px-4 py-2 text-sm text-[#9DB7AA] hover:bg-[#1F3337]"
                            >
                                Profil
                            </Link>

                            <button
                                onClick={() => {
                                    setShowMenu(false);
                                    logout();
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#1F3337]"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}