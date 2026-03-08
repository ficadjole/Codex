import { useEffect, useState } from "react";
import { itemApi } from "../api_services/itemApi/ItemApiService";
import ItemCarousel from "../components/items/ItemCarousel";
import type { ItemDto } from "../models/item/ItemDto";

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

      <section className="px-8 py-16">
        <h2 className="text-xl mb-8">KNJIGE</h2>

        <ItemCarousel
          items={books}
          visibleCount={4}
        />
      </section>

      <section className="px-8 py-16">
        <h2 className="text-xl mb-8">AKSESOARI</h2>

        <ItemCarousel
          items={accessories}
          visibleCount={5}
        />
      </section>

    </div>
  );
}