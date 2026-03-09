import type { AccessoryDetailsCardProps } from "../../types/props/admin_add_item_props/AccessoryDetailsCardProps";

export default function AccessoryDetailsCard({
    name,
    setName,
    price,
    setPrice,
    description,
    setDescription,
    content,
    setContent,
    errors
}: AccessoryDetailsCardProps) {

    return (

        <div className="lg:col-span-2 card space-y-6">

            <h2 className="text-2xl font-semibold">
                Informacije o aksesoaru
            </h2>

            <div className="space-y-1">
                <label className="text-sm">
                    Naziv aksesoara <span className="text-red-500">*</span>
                </label>
                <input
                    className="input"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                {errors.name && (
                    <p className="text-red-500 text-xs">
                        {errors.name}
                    </p>
                )}
            </div>

            <div className="space-y-1">
                <label className="text-sm">
                    Cena (rsd) <span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    className="input"
                    value={price || ""}
                    onChange={e => setPrice(e.target.value ? Number(e.target.value) : null)}
                />
                {errors.price && (
                    <p className="text-red-500 text-xs">
                        {errors.price}
                    </p>
                )}
            </div>

            <div className="space-y-1">
                <label className="text-sm">
                    Opis aksesoara <span className="text-red-500">*</span>
                </label>
                <textarea
                    rows={4}
                    className="input"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                {errors.description && (
                    <p className="text-red-500 text-xs">
                        {errors.description}
                    </p>
                )}
            </div>
            <div className="space-y-1">
                <label className="text-sm">
                    Sadržaj pakovanja <span className="text-red-500">*</span>
                </label>
                <textarea
                    rows={3}
                    className="input"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                 {errors.content && (
                    <p className="text-red-500 text-xs">
                        {errors.content}
                    </p>
                )}
            </div>

        </div>

    )
}