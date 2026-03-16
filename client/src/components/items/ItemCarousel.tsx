import { useState } from "react";
import ItemCard from "./ItemCard";
import type { ItemCarouselProps } from "../../types/props/item_props/ItemCarouselProps";

export default function ItemCarousel({ items, visibleCount }: ItemCarouselProps) {

  const [index, setIndex] = useState(0);

  const canGoLeft = index > 0;
  const canGoRight = index + visibleCount < items.length;

  const next = () => {
    if (canGoRight) setIndex(index + 1);
  };

  const prev = () => {
    if (canGoLeft) setIndex(index - 1);
  };

  const visibleItems = items.slice(index, index + visibleCount);

  return (
    <div className="flex items-center justify-center gap-6 w-full">

      {/* LEFT BUTTON */}
      <button
        onClick={prev}
        disabled={!canGoLeft}
        className={`w-10 h-10 rounded-full border border-[#1F3337] flex items-center justify-center
        transition
        ${canGoLeft
            ? "text-[#9DB7AA] hover:text-white hover:border-[#3F8A4B]"
            : "text-[#2A3B3F] cursor-not-allowed"
          }`}
      >
        ❮
      </button>

      {/* ITEMS */}
      <div className="flex gap-6">
        {visibleItems.map((item) => (
          <ItemCard key={item.itemId} item={item} />
        ))}
      </div>

      {/* RIGHT BUTTON */}
      <button
        onClick={next}
        disabled={!canGoRight}
        className={`w-10 h-10 rounded-full border border-[#1F3337] flex items-center justify-center
        transition
        ${canGoRight
            ? "text-[#9DB7AA] hover:text-white hover:border-[#3F8A4B]"
            : "text-[#2A3B3F] cursor-not-allowed"
          }`}
      >
        ❯
      </button>

    </div>
  );
}