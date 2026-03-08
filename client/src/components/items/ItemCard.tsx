import type { ItemCardProps } from "../../types/props/item_props/ItemCardProps";

export default function ItemCard({ item, author }: ItemCardProps) {
  return (
    <div
      className="
        w-44
        bg-gradient-to-b from-[#1A2E33] to-[#142326]
        rounded-xl
        shadow-[0_10px_25px_rgba(0,0,0,0.5)]
        hover:scale-105
        hover:shadow-[0_15px_35px_rgba(0,0,0,0.7)]
        transition duration-300
        overflow-hidden
      "
    >
      <img
        src={item.primaryImageUrl}
        alt={item.name}
        className="w-full h-40 object-cover"
      />

      <div className="p-3 flex flex-col gap-1">

        <h3 className="text-sm font-semibold line-clamp-2">
          {item.name}
        </h3>

        {author && (
          <p className="text-xs text-[#9DB7AA]">
            {author}
          </p>
        )}

        <p className="text-sm font-bold mt-1">
          {item.price} RSD
        </p>

        <button
          className="
          mt-2
          text-xs
          border border-[#9DB7AA]
          rounded
          py-1
          hover:bg-[#9DB7AA]
          hover:text-black
          transition
          "
        >
          Detalji
        </button>

      </div>
    </div>
  );
}