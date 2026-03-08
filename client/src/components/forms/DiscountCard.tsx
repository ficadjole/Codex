import type { DiscountCardProps } from "../../types/props/admin_add_item_props/DiscountCardProps";

export default function DiscountCard({
  discountPercent,
  setDiscountPercent,
  discountFrom,
  setDiscountFrom,
  discountTo,
  setDiscountTo
}: DiscountCardProps) {

  return (

    <div className="card space-y-4 flex-1">

      <h2 className="text-xl font-semibold">
        Popust
      </h2>

      <input
        type="number"
        placeholder="Procenat popusta"
        className="input"
        value={discountPercent ?? ""}
        onChange={e =>
          setDiscountPercent(
            e.target.value === "" ? null : Number(e.target.value)
          )
        }
      />

      <input
        type="date"
        className="input"
        value={discountFrom}
        onChange={e => setDiscountFrom(e.target.value)}
      />

      <input
        type="date"
        className="input"
        value={discountTo}
        onChange={e => setDiscountTo(e.target.value)}
      />

    </div>

  )
}