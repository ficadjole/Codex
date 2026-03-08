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
    <div className="flex items-center gap-6">

      {canGoLeft && (
        <button
          onClick={prev}
          className="text-3xl text-[#9DB7AA] hover:text-white transition"
        >
          {"<"}
        </button>
      )}

      <div className="flex gap-6">
        {visibleItems.map((item) => (
          <ItemCard key={item.itemId} item={item} />
        ))}
      </div>

      {canGoRight && (
        <button
          onClick={next}
          className="text-3xl text-[#9DB7AA] hover:text-white transition"
        >
          {">"}
        </button>
      )}

    </div>
  );
}