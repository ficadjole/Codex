import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuthHook";

import { FiSearch, FiShoppingCart, FiHeart, FiMenu, FiX } from "react-icons/fi";
import { HiOutlineUser } from "react-icons/hi";
import { ChevronDown } from "lucide-react";

export default function Header() {
    const { user, isAuthenticated, logout } = useAuth();

    const [showSearch, setShowSearch] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

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
        <>
            <header
                className="
                            w-full sticky top-0 z-50
                            h-16 md:h-20
                            bg-gradient-to-r from-[#0C1618] via-[#152A2E] to-[#0C1618]
                            border-b border-[#1F3337]
                            px-4 md:px-8
                            flex items-center justify-between
                            "
            >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-4">
                    {/* Hamburger (mobile only) */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden text-[#9DB7AA] hover:text-white transition"
                    >
                        <FiMenu
                            size={22}
                            className={`transition-transform duration-300 ${mobileOpen ? "rotate-90" : ""
                                }`}
                        />
                    </button>

                    <Link to="/">
                        <img
                            src="/dekaton logo.png"
                            alt="Dekaton logo"
                            className="h-10 md:h-14 object-contain mx-6"
                        />
                    </Link>
                </div>

                {/* DESKTOP NAV */}
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

                    {isAuthenticated && user?.userRole === "admin" && (
                        <Link to="/admin/orders" className="hover:text-[#3F8A4B] transition">
                            Narudžbine
                        </Link>
                    )}
                </nav>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-4 sm:gap-6 relative">

                    {/* Search */}
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
                                    ? "w-40 sm:w-56 opacity-100"
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
                        className="hidden sm:block text-[#9DB7AA] hover:text-[#3F8A4B] transition"
                    >
                        <FiHeart size={20} />
                    </Link>

                    {!isAuthenticated ? (
                        <Link
                            to="/login"
                            className="flex items-center gap-2 text-[#9DB7AA] hover:text-[#3F8A4B]"
                        >
                            <HiOutlineUser size={20} />
                            <span className="hidden sm:inline">Login</span>
                        </Link>
                    ) : (
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="flex items-center gap-2 text-[#3F8A4B] font-medium hover:text-white"
                            >
                                {user?.username}
                                <ChevronDown size={18} />
                            </button>

                            {showMenu && (
                                <div className="absolute right-0 mt-3 w-44 bg-[#142326] border border-[#1F3337] rounded-lg shadow-lg py-2">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-sm text-[#9DB7AA] hover:bg-[#1F3337]"
                                    >
                                        Profil
                                    </Link>

                                    <Link
                                        to="/orders"
                                        className="block px-4 py-2 text-sm text-[#9DB7AA] hover:bg-[#1F3337]"
                                    >
                                        Narudžbine
                                    </Link>

                                    <button
                                        onClick={() => {
                                            logout();
                                            navigate("/");
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#1F3337]"
                                    >
                                        Log out
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </header>

            {/* MOBILE SLIDE MENU */}
            <div
                className={`fixed inset-0 z-50 transition ${mobileOpen ? "visible" : "invisible"
                    }`}
            >
                {/* Overlay */}
                <div
                    className={`absolute inset-0 bg-black/50 transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"
                        }`}
                    onClick={() => setMobileOpen(false)}
                />

                {/* Panel */}
                <div
                    className={`absolute left-0 top-0 h-full w-64 bg-[#142326]
                                border-r border-[#1F3337] p-6
                                transform transition-transform duration-300
                                ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <div className="flex justify-between items-center mb-8">
                        <span className="text-lg font-semibold">Meni</span>
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden text-[#9DB7AA] hover:text-white transition relative z-50"
                        ><FiX
                                size={22}
                                
                            /></button>
                        
                    </div>

                    <div className="flex flex-col gap-6 text-[#9DB7AA] uppercase text-sm">
                        <Link to="/" onClick={() => setMobileOpen(false)}>
                            Naslovna
                        </Link>
                        <Link to="/blog" onClick={() => setMobileOpen(false)}>
                            Blog
                        </Link>
                        <Link to="/news" onClick={() => setMobileOpen(false)}>
                            Novosti
                        </Link>

                        {isAuthenticated && user?.userRole === "admin" && (
                            <Link
                                to="/admin/orders"
                                onClick={() => setMobileOpen(false)}
                            >
                                Narudžbine
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}