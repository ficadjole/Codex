import type { PaginationProps } from "../../types/props/pagination_props/PaginationProps"

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) {

  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center gap-2 mt-6">

      {Array.from({ length: totalPages }, (_, i) => {

        const page = i + 1

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded transition
            ${currentPage === page
              ? "bg-[#3F8A4B] text-white"
              : "bg-[#1F3337] text-gray-300 hover:bg-[#243b40]"
            }`}
          >
            {page}
          </button>
        )

      })}

    </div>
  )
}