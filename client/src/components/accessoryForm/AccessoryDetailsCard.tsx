import type { AccessoryDetailsCardProps } from "../../types/props/admin_add_item_props/AccessoryDetailsCardProps";

export default function AccessoryDetailsCard({
    name,
    setName,
    price,
    setPrice,
    description,
    setDescription,
    content,
    setContent
}: AccessoryDetailsCardProps) {

    return (

        <div className="lg:col-span-2 card space-y-6">

            <h2 className="text-2xl font-semibold">
                Informacije o aksesoaru
            </h2>

            <input
                placeholder="Naziv proizvoda"
                className="input"
                value={name}
                onChange={e => setName(e.target.value)}
            />

            <input
                type="number"
                placeholder="Cena (RSD)"
                className="input"
                value={price || ""}
                onChange={e => setPrice(Number(e.target.value))}
            />

            <textarea
                placeholder="Opis proizvoda"
                rows={4}
                className="input"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />

            <textarea
                placeholder="Sadržaj pakovanja"
                rows={3}
                className="input"
                value={content}
                onChange={e => setContent(e.target.value)}
            />

        </div>

    )
}