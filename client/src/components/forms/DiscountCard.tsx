import type { DiscountCardProps } from "../../types/props/admin_add_item_props/DiscountCardProps";

export default function DiscountCard({
  discountPercent,
  setDiscountPercent,
  discountFrom,
  setDiscountFrom,
  discountTo,
  setDiscountTo,
  errors
}: DiscountCardProps) {

  return (

    <div className="card space-y-4 flex-1">

      <h2 className="text-xl font-semibold">
        Popust
      </h2>

      <div className="space-y-1">
        <label className="text-sm">
          Procenat popusta 
        </label>
        <input
          type="number"
          className="input"
          value={discountPercent ?? ""}
          onChange={e =>
            setDiscountPercent(
              e.target.value === "" ? null : Number(e.target.value)
            )
          }
        />
        {errors.discountPercent && (
          <p className="text-red-500 text-xs">
            {errors.discountPercent}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm">
          Od 
        </label>
        <input
          type="date"
          className="input"
          value={discountFrom}
          onChange={e => setDiscountFrom(e.target.value)}
        />
        {errors.discountFrom && (
          <p className="text-red-500 text-xs">
            {errors.discountFrom}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm">
          Do 
        </label>
        <input
          type="date"
          className="input"
          value={discountTo}
          onChange={e => setDiscountTo(e.target.value)}
        />
        {errors.discountTo && (
          <p className="text-red-500 text-xs">
            {errors.discountTo}
          </p>
        )}
      </div>

    </div>

  )
}