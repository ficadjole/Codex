import { useState } from "react";
import type { ItemDto } from "../../models/item/ItemDto";
import ItemCard from "./ItemCard";

interface Props {
  items: ItemDto[];
  visibleCount: number;
}

export default function ItemCarousel({ items, visibleCount }: Props) {

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