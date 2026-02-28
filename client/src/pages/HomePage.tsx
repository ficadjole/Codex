import { useEffect, useState } from "react";

export default function Home() {
const positions = [
  "object-[20%_5%]",    
  "object-[80%_10%]",   
  "object-[75%_45%]",   
  "object-[25%_60%]",  
  "object-[20%_95%]",   
  "object-[80%_85%]",   
  "object-[50%_50%]",   
];

  const [positionIndex, setPositionIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPositionIndex((prev) => (prev + 1) % positions.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0C1618] text-[#EAF4EF]">

      <section className="relative h-[450px] overflow-hidden">
        <img
          src="/mapa.jpg" 
          alt="Mapa Dekatona"
          className={`absolute inset-0 w-full h-full object-cover scale-105 transition-all duration-[4000ms] ease-in-out ${positions[positionIndex]}`}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#0C1618]/80 via-[#0C1618]/50 to-[#0C1618]" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-5xl font-[Cinzel] tracking-[0.2em] mb-6">
            DOBRODOŠLI U SVET DEKATONA
          </h1>

          <p className="max-w-2xl text-[#9DB7AA]">
            Epska saga. Početak rata. Svet u kojem se granice brišu.
          </p>
        </div>
      </section>

      <section className="px-8 py-16">
        <div className="max-w-6xl mx-auto">

          <h2 className="uppercase text-sm tracking-widest text-[#9DB7AA] mb-8">
            Knjige
          </h2>

          <div className="flex items-center gap-6">
            
            <button className="text-3xl text-[#9DB7AA] hover:text-white transition">
              {"<"}
            </button>

            <div className="flex gap-6">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="w-44 h-60 bg-[#1A2E33] rounded-xl hover:scale-105 transition duration-300"
                />
              ))}
            </div>

            <button className="text-3xl text-[#9DB7AA] hover:text-white transition">
              {">"}
            </button>

          </div>
        </div>
      </section>

    </div>
  );
}