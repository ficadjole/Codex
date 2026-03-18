import { useEffect, useState } from "react";
import type { HomeProps } from "../../types/props/home_props/HomeProps";
import type { ItemDto } from "../../models/item/ItemDto";
import ItemCarousel from "../../components/items/ItemCarousel";

export default function Home({ itemApi }: HomeProps) {
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
  const [books, setBooks] = useState<ItemDto[]>([]);
  const [accessories, setAccessories] = useState<ItemDto[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPositionIndex((prev) => (prev + 1) % positions.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadItems = async () => {
      const items = await itemApi.getAllItems();

      const books = items.filter(i => i.type === "knjiga");
      const accessories = items.filter(i => i.type === "aksesoar");

      setBooks(books);
      setAccessories(accessories);
    };
    loadItems();
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
          <h1 className="text-5xl opacity-80 tracking-[0.2em] mb-6">
            DOBRODOŠLI U SVET DEKATONA
          </h1>

          <p className="max-w-2xl opacity-85 text-[#9DB7AA]">
            Epska saga. Početak rata. Svet u kojem se granice brišu.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-16">

        <div className="flex items-center gap-6 mb-10">
          <div className="flex-1 h-[1px] bg-[#1F3337]" />
          <h2 className="text-2xl tracking-widest text-[#9DB7AA]">
            KNJIGE
          </h2>
          <div className="flex-1 h-[1px] bg-[#1F3337]" />
        </div>
        
        <ItemCarousel
          items={books}
          visibleCount={5}
        />
      </section>

      <section className="max-w-7xl mx-auto px-8 py-16">

        <div className="flex items-center gap-6 mb-10">
          <div className="flex-1 h-[1px] bg-[#1F3337]" />
          <h2 className="text-2xl tracking-widest text-[#9DB7AA]">
            AKSESOARI
          </h2>
          <div className="flex-1 h-[1px] bg-[#1F3337]" />
        </div>

        <ItemCarousel
          items={accessories}
          visibleCount={5}
        />
      </section>

    </div>
  );
}