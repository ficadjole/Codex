import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaGoodreads, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    /*<footer className="bg-[#0F1B1E] text-[#9DB7AA] border-t border-[#1F3337]">*/
    <footer className="bg-gradient-to-r
                      from-[#0C1618]
                      via-[#102022]
                      to-[#0C1618]
                      border-t border-[#1F3337]
                      text-[#9DB7AA]">
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-16">

          <div>
            <h2 className="text-2xl text-[#EAF4EF] mb-2 tracking-wide">
              DEKATON
            </h2>

            <p className="text-xs text-[#6F9E8E] mb-4">
              Izdavač: Codex
            </p>

            <p className="max-w-sm leading-relaxed text-sm">
              Zvanična stranica fantastične sage.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm">

            <div className="flex flex-col gap-3">
              <Link to="/" className="hover:text-white transition duration-300">Naslovna</Link>
              <Link to="/blog" className="hover:text-white transition duration-300">Blog</Link>
              <Link to="/news" className="hover:text-white transition duration-300">Novosti</Link>
            </div>

            <div className="flex flex-col gap-3">
              <Link to="/o-nama" className="hover:text-white transition duration-300">O nama</Link>
              <Link to="/login" className="hover:text-white transition duration-300">Prijava</Link>
              <a href="mailto:codexudruzenje@gmail.com" className="hover:text-white transition duration-300">
                Kontakt
              </a>
            </div>

          </div>
        </div>

        <div className="my-8 h-px bg-[#1F3337]"></div>

        <div className="flex justify-center gap-8 text-xl mb-6">
          <a href="https://www.instagram.com/dekaton.saga" target="_blank" rel="noopener noreferrer" className="hover:text-white transition hover:scale-110 duration-300">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com/dekaton.saga" target="_blank" rel="noopener noreferrer" className="hover:text-white transition hover:scale-110 duration-300">
            <FaFacebook />
          </a>
          <a href="https://www.goodreads.com/search?q=dekaton" target="_blank" rel="noopener noreferrer" className="hover:text-white transition hover:scale-110 duration-300">
            <FaGoodreads />
          </a>
          <a href="https://www.youtube.com/@dekaton9333" target="_blank" rel="noopener noreferrer" className="hover:text-white transition hover:scale-110 duration-300">
            <FaYoutube />
          </a>
        </div>

        <div className="text-center text-xs text-[#6F9E8E]">
          © {new Date().getFullYear()} Dekaton. Sva prava zadržana.
        </div>

      </div>
    </footer>
  );
}